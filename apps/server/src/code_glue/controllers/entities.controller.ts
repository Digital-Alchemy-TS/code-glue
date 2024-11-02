import { TServiceParams } from "@digital-alchemy/core";
import { Type } from "@sinclair/typebox";

import { SynapseEntityCreateOptions } from "../../utils";

const params = Type.Object({ id: Type.String() });

export function SynapseEntitiesController({
  http: { controller },
  database: { entity },
  config,
}: TServiceParams) {
  controller([config.code_glue.V1, "/synapse"], app =>
    app
      .get("/", () => entity.list())
      .get("/:id", { schema: { params } }, ({ params: { id } }) =>
        entity.get(id),
      )
      .delete("/:id", { schema: { params } }, ({ params: { id } }) =>
        entity.remove(id),
      )
      .post("/", { schema: { body: SynapseEntityCreateOptions } }, ({ body }) =>
        entity.create(body),
      )
      .put(
        "/:id",
        { schema: { body: SynapseEntityCreateOptions, params } },
        ({ body, params: { id } }) => entity.update(id, body),
      ),
  );
}
