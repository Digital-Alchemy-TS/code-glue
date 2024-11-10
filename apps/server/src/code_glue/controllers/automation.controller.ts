import { TServiceParams } from "@digital-alchemy/core";
import { Type } from "@sinclair/typebox";

import { AutomationCreateOptions } from "../../utils";

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
      .put(
        "/:id",
        { schema: { body: AutomationCreateOptions, params } },
        ({ body, params: { id } }) => {
          return automation.update(id, body);
        },
      ),
  );
}
