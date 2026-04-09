import { TServiceParams } from "@digital-alchemy/core";
import { Type } from "@sinclair/typebox";

const params = Type.Object({ id: Type.String() });
const versionParams = Type.Object({ id: Type.String(), versionId: Type.String() });

const CreateDraftBody = Type.Object({
  body: Type.String(),
  parentVersionId: Type.Optional(Type.String()),
});

const UpdateDraftBody = Type.Object({
  body: Type.Optional(Type.String()),
  name: Type.Optional(Type.String()),
  notes: Type.Optional(Type.String()),
});

const FinalizeBody = Type.Object({
  name: Type.Optional(Type.String()),
  notes: Type.Optional(Type.String()),
  wasAutoSaved: Type.Boolean(),
  makeActive: Type.Optional(Type.Boolean()),
});

export function AutomationVersionController({
  http: { controller },
  config,
  code_glue,
}: TServiceParams) {
  controller([config.code_glue.V1, "/automation/:id/versions"], app =>
    app
      // GET /api/v1/automation/:id/versions — list all versions for an automation
      .get(
        "/",
        { schema: { params } },
        ({ params: { id } }) => code_glue.automationVersion.listForAutomation(id),
      )
      // POST /api/v1/automation/:id/versions — create a draft version
      .post(
        "/",
        { schema: { body: CreateDraftBody, params } },
        ({ body, params: { id } }) =>
          code_glue.automationVersion.createDraft(id, body.body, body.parentVersionId),
      )
      // PUT /api/v1/automation/:id/versions/:versionId — update draft body or finalize
      .put(
        "/:versionId",
        { schema: { body: UpdateDraftBody, params: versionParams } },
        ({ body, params: { versionId } }) =>
          code_glue.automationVersion.updateDraft(versionId, {
            body: body.body,
            name: body.name,
            notes: body.notes,
          }),
      )
      // POST /api/v1/automation/:id/versions/:versionId/finalize — finalize a draft
      .post(
        "/:versionId/finalize",
        { schema: { body: FinalizeBody, params: versionParams } },
        ({ body, params: { versionId } }) =>
          code_glue.automationVersion.finalizeVersion(versionId, {
            name: body.name,
            notes: body.notes,
            wasAutoSaved: body.wasAutoSaved,
            makeActive: body.makeActive,
          }),
      )
      // POST /api/v1/automation/:id/versions/:versionId/activate — activate a version
      .post(
        "/:versionId/activate",
        { schema: { params: versionParams } },
        ({ params: { id, versionId } }) =>
          code_glue.automationVersion.activateVersion(id, versionId),
      )
      // DELETE /api/v1/automation/:id/versions/:versionId — delete a version
      .delete(
        "/:versionId",
        { schema: { params: versionParams } },
        ({ params: { versionId } }) =>
          code_glue.automationVersion.removeVersion(versionId),
      ),
  );
}
