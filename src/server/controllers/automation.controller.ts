import { TServiceParams } from "@digital-alchemy/core";
import { t } from "elysia";

import { StoredAutomation } from "../../utils";

export function AutomationController({
  elysia: { app },
  database: { automation },
}: TServiceParams) {
  app.group("automation", app =>
    app
      .get("/", () => automation.list())
      .get("/:id", ({ params }) => automation.get(params.id), {
        params: t.Object({ id: t.String() }),
      })
      .delete("/:id", ({ params }) => automation.remove(params.id), {
        params: t.Object({ id: t.String() }),
      })
      .post("/", ({ body }) => automation.create(body as StoredAutomation), {
        body: StoredAutomation,
      })
      .put(
        "/:id",
        ({ body, params }) =>
          automation.update(params.id, body as StoredAutomation),
        {
          body: StoredAutomation,
          params: t.Object({ id: t.String() }),
        },
      ),
  );
}
