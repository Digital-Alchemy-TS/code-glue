import { TServiceParams } from "@digital-alchemy/core";

export function TypeWriterController({
  http: { controller },
  database: { automation },
  config,
}: TServiceParams) {
  controller([config.code_glue.V1, "/type-writer"], app =>
    app.get("/", () => automation.list()),
  );
}
