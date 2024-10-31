import { TServiceParams } from "@digital-alchemy/core";
import { Type } from "@sinclair/typebox";

import { StoredAutomation } from "../../utils";

const params = Type.Object({ id: Type.String() });

export function AutomationController({
  http: { controller },
  database: { automation },
  config,
}: TServiceParams) {
  controller([config.code_glue.V1, "/automation"], app =>
    app

      .get("/", () => automation.list())
      .get("/:id", { schema: { params } }, ({ params: { id } }) =>
        automation.get(id),
      )
      .delete("/:id", { schema: { params } }, ({ params: { id } }) =>
        automation.remove(id),
      )
      .post("/", { schema: { body: StoredAutomation } }, ({ body }) =>
        automation.create(body as StoredAutomation),
      )
      .put(
        "/:id",
        { schema: { body: StoredAutomation, params } },
        ({ body, params: { id } }) =>
          automation.update(id, body as StoredAutomation),
      ),
  );
}
