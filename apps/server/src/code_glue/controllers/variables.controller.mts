import { TServiceParams } from "@digital-alchemy/core";
import { Type } from "@sinclair/typebox";

import { SharedVariableCreateOptions } from "../../utils/index.mts";

const params = Type.Object({ id: Type.String() });

export function VariablesController({
  http: { controller },
  database: { variable },
  config,
}: TServiceParams) {
  controller([config.code_glue.V1, "/variable"], app =>
    app
      .get("/", () => variable.list())
      .get("/:id", { schema: { params } }, ({ params: { id } }) =>
        variable.get(id),
      )
      .delete("/:id", { schema: { params } }, ({ params: { id } }) =>
        variable.remove(id),
      )
      .post(
        "/",
        { schema: { body: SharedVariableCreateOptions } },
        ({ body }) => variable.create(body),
      )
      .put(
        "/:id",
        { schema: { body: SharedVariableCreateOptions, params } },
        ({ body, params: { id } }) => variable.update(id, body),
      ),
  );
}
