import type { RemoveCallback } from "@digital-alchemy/core";
import { Type } from "@sinclair/typebox";

/**
 * Make sure to keep sqlite definitions up to date
 *
 * apps/server/src/database/services/automation.service.ts
 */
export const StoredAutomation = Type.Object(
  {
    active: Type.Boolean({ description: "Should the code in this be running" }),
    activeVersionId: Type.Optional(Type.String({ description: "ID of the currently active version" })),
    area: Type.Optional(Type.String({ description: "Home Assistant area_id" })),
    body: Type.String({ description: "Function body, in Typescript" }),
    context: Type.String({ description: "Log context" }),
    createDate: Type.String({ description: "ISO timestamp" }),
    documentation: Type.String({
      description: "User provided markdown notes",
    }),
    icon: Type.Optional(Type.String({ description: "Icon for UI" })),
    id: Type.String({ description: "UUID" }),
    labels: Type.Array(Type.String(), {
      description: "Home Assistant label_id",
    }),
    lastUpdate: Type.String({ description: "ISO timestamp" }),
    parent: Type.Optional(
      Type.String({
        description: "Reference to another automation to declare as parent. For UI purposes",
      }),
    ),
    title: Type.String({ description: "Human readable title" }),
  },
  { description: "Used to store the actual automation on disk" },
);
export type StoredAutomation = typeof StoredAutomation.static;

export const AutomationCreateOptions = Type.Omit(StoredAutomation, [
  "id",
  "lastUpdate",
  "createDate",
]);

export type AutomationCreateOptions = typeof AutomationCreateOptions.static;

export const AutomationUpdateOptions = Type.Omit(AutomationCreateOptions, ["id"]);

export type AutomationUpdateOptions = Partial<typeof AutomationUpdateOptions.static>;

export const StoredAutomationRow = Type.Intersect([
  Type.Omit(StoredAutomation, ["createDate", "lastUpdate", "active", "labels"]),
  Type.Object({
    active: Type.String(),
    createDate: Type.String(),
    labels: Type.String(),
    lastUpdate: Type.String(),
  }),
]);
export type StoredAutomationRow = typeof StoredAutomationRow.static;

export const AutomationVersion = Type.Object(
  {
    activatedFromVersionId: Type.Optional(Type.String({ description: "Version this was activated from" })),
    automationId: Type.String({ description: "Parent automation UUID" }),
    body: Type.String({ description: "TypeScript code at this version" }),
    date: Type.String({ description: "ISO timestamp of creation" }),
    documentation: Type.Optional(Type.String({ description: "Snapshot of automation docs at save time" })),
    hasCodeChange: Type.Boolean({ description: "Did body change vs parent?" }),
    hasNotesChange: Type.Boolean({ description: "Did documentation change vs parent?" }),
    id: Type.String({ description: "UUID" }),
    isActive: Type.Boolean({ description: "Is this the active running version?" }),
    isDraft: Type.Boolean({ description: "Is this an unsaved draft?" }),
    name: Type.Optional(Type.String({ description: "Optional version name" })),
    notes: Type.Optional(Type.String({ description: "Optional commit-style notes" })),
    parentVersionId: Type.Optional(Type.String({ description: "Previous version in the chain" })),
    wasAutoSaved: Type.Boolean({ description: "Was this auto-saved after idle period?" }),
    writtenByAi: Type.Boolean({ description: "Was this version written by AI?" }),
  },
  { description: "A single version snapshot of an automation" },
);
export type AutomationVersion = typeof AutomationVersion.static;

export const AutomationVersionCreateOptions = Type.Omit(AutomationVersion, ["id"]);
export type AutomationVersionCreateOptions = typeof AutomationVersionCreateOptions.static;

export const AutomationVersionUpdateOptions = Type.Partial(
  Type.Omit(AutomationVersionCreateOptions, ["automationId"]),
);
export type AutomationVersionUpdateOptions = typeof AutomationVersionUpdateOptions.static;

export type AutomationTeardown = {
  register(remove: RemoveCallback, type: string): void;
  teardown(): void;
};
