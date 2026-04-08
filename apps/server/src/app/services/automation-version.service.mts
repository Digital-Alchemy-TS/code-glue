import { TServiceParams } from "@digital-alchemy/core";

import { AutomationVersionUpdateOptions, StoredAutomation } from "../../utils/index.mts";
import { formatAutomationContext } from "../../utils/helpers/format.mts";

export function AutomationVersionLogic({
  database,
  coordinator,
  internal,
  lifecycle,
  logger,
}: TServiceParams) {
  /**
   * Returns a logger scoped to the automation's own context so entries appear
   * in the per-automation Logs tab.
   */
  function automationLogger(automation: StoredAutomation) {
    const context =
      (automation.context && `automation/${automation.context}`) ||
      (automation.title && formatAutomationContext(automation.title)) ||
      `automation/${automation.id}`;
    return internal.boilerplate.logger.context(context);
  }
  /**
   * On bootstrap: ensure every automation has at least one version.
   * Handles automations that existed before the versioning migration,
   * or any edge-case where a version was not created.
   */
  lifecycle.onBootstrap(async function seedMissingInitialVersions() {
    const automations = database.automation.list();
    const seeded: string[] = [];

    for (const automation of automations) {
      const existing = database.automationVersion.listForAutomation(automation.id);
      if (existing.length > 0) continue;

      const date =
        (automation as unknown as { create_date?: string }).create_date ??
        automation.createDate ??
        new Date().toISOString();

      const formattedDate = new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const version = await database.automationVersion.create({
        activatedFromVersionId: undefined,
        automationId: automation.id,
        body: automation.body,
        date,
        documentation: automation.documentation,
        hasCodeChange: true,
        hasNotesChange: false,
        isActive: true,
        isDraft: false,
        name: `Initial version — ${formattedDate}`,
        notes: undefined,
        parentVersionId: undefined,
        wasAutoSaved: false,
        writtenByAi: false,
      });

      // Point the automation at its new initial version
      await database.automation.update(automation.id, {
        activeVersionId: version.id,
      } as never);

      seeded.push(automation.id);
    }

    if (seeded.length > 0) {
      logger.info(
        { seeded: seeded.length },
        "Seeded initial versions for automations missing one",
      );
    }
  });

  /**
   * Create a new draft version for an automation.
   * Called when the user first edits after the active version is saved.
   */
  async function createDraft(
    automationId: string,
    body: string,
    parentVersionId: string | undefined,
  ) {
    const automation = database.automation.get(automationId);
    if (!automation) {
      throw new Error(`Automation ${automationId} not found`);
    }

    return await database.automationVersion.create({
      activatedFromVersionId: undefined,
      automationId,
      body,
      date: new Date().toISOString(),
      documentation: automation.documentation,
      hasCodeChange: true,
      hasNotesChange: false,
      isActive: false,
      isDraft: true,
      name: undefined,
      notes: undefined,
      parentVersionId,
      wasAutoSaved: false,
      writtenByAi: false,
    });
  }

  /**
   * Update fields on an existing draft version.
   * Body changes (debounced editor saves) also update the timestamp.
   * Metadata-only changes (name, notes) leave the timestamp unchanged.
   */
  async function updateDraft(
    versionId: string,
    opts: { body?: string; name?: string; notes?: string },
  ) {
    const updates: AutomationVersionUpdateOptions = {};
    if (opts.body !== undefined) {
      updates.body = opts.body;
      updates.date = new Date().toISOString();
    }
    if (opts.name !== undefined) updates.name = opts.name;
    if (opts.notes !== undefined) updates.notes = opts.notes;
    return await database.automationVersion.update(versionId, updates);
  }

  /**
   * Finalize a draft version — commits it to history (isDraft → false).
   *
   * By default (`makeActive: true`) the version also becomes the active running
   * version, the coordinator reloads, and automation.body is updated.
   *
   * Pass `makeActive: false` to archive the draft into history without changing
   * what is currently running — used when "Use as draft" needs to preserve an
   * existing draft before replacing it.
   */
  async function finalizeVersion(
    versionId: string,
    opts: {
      name?: string;
      notes?: string;
      wasAutoSaved: boolean;
      makeActive?: boolean;
    },
  ) {
    const makeActive = opts.makeActive !== false; // default true

    const version = database.automationVersion.get(versionId);
    if (!version) {
      throw new Error(`Version ${versionId} not found`);
    }

    const automation = database.automation.get(version.automationId);
    if (!automation) {
      throw new Error(`Automation ${version.automationId} not found`);
    }

    // Snapshot current documentation at finalize time
    const hasNotesChange = version.documentation !== automation.documentation;

    const updated = await database.automationVersion.update(versionId, {
      documentation: automation.documentation,
      hasNotesChange,
      isActive: makeActive,
      isDraft: false,
      name: opts.name,
      notes: opts.notes,
      wasAutoSaved: opts.wasAutoSaved,
    });

    if (makeActive) {
      // Mark previous active version as inactive
      const previousActive = database.automationVersion
        .listForAutomation(version.automationId)
        .find((v) => v.isActive && v.id !== versionId);

      if (previousActive) {
        await database.automationVersion.update(previousActive.id, { isActive: false });
      }

      // Update automation body and active_version_id, then reload coordinator
      await database.automation.update(version.automationId, {
        activeVersionId: versionId,
        body: version.body,
      } as never);

      coordinator.loader.reload(version.automationId);

      const versionLabel = opts.name ? `"${opts.name}"` : "unnamed version";
      automationLogger(automation).info(
        { versionId },
        `Version saved and activated: ${versionLabel}`,
      );
    }

    return updated;
  }

  /**
   * Activate a historical version.
   * Moves the active flag directly to the target version — no new version is created.
   * The coordinator reloads with that version's body. Any in-progress draft is left
   * untouched so the user can continue editing and save it later.
   */
  async function activateVersion(automationId: string, versionId: string) {
    const targetVersion = database.automationVersion.get(versionId);
    if (!targetVersion) {
      throw new Error(`Version ${versionId} not found`);
    }

    const automation = database.automation.get(automationId);
    if (!automation) {
      throw new Error(`Automation ${automationId} not found`);
    }

    // Mark current active version as inactive (skip drafts — they are never active)
    const currentActive = database.automationVersion
      .listForAutomation(automationId)
      .find((v) => v.isActive);

    if (currentActive) {
      await database.automationVersion.update(currentActive.id, { isActive: false });
    }

    // Move the active flag to the target version
    const updatedVersion = await database.automationVersion.update(versionId, {
      isActive: true,
    });

    // Update automation body and active_version_id, then reload coordinator
    await database.automation.update(automationId, {
      activeVersionId: versionId,
      body: targetVersion.body,
    } as never);

    const versionLabel = (v: { name?: string; date: string }) =>
      v.name ? `"${v.name}"` : new Date(v.date).toLocaleString();
    const previousLabel = currentActive ? versionLabel(currentActive) : "unknown";
    const targetLabel = versionLabel(targetVersion);
    automationLogger(automation).info(
      { versionId, previousVersionId: currentActive?.id },
      `Active version switched to ${targetLabel} (was: ${previousLabel})`,
    );

    coordinator.loader.reload(automationId);

    return updatedVersion;
  }

  /**
   * Get all versions for an automation.
   */
  function listForAutomation(automationId: string) {
    return database.automationVersion.listForAutomation(automationId);
  }

  /**
   * Delete a specific version.
   */
  async function removeVersion(versionId: string) {
    const version = database.automationVersion.get(versionId);
    if (version?.isActive) {
      throw new Error("Cannot delete the currently active version");
    }
    await database.automationVersion.remove(versionId);
  }

  return {
    activateVersion,
    createDraft,
    finalizeVersion,
    listForAutomation,
    removeVersion,
    updateDraft,
  };
}
