import { TServiceParams } from "@digital-alchemy/core";

export function TypesController({
  http: { controller },
  config,
  code_glue,
}: TServiceParams) {
  controller([config.code_glue.V1, "/types"], app =>
    app
      .get("/debug", () => code_glue.header.debugBlock())
      .get("/hidden", () => code_glue.header.hiddenBlock()),
  );
}
