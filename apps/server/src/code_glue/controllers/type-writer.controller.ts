import { TServiceParams } from "@digital-alchemy/core";

export function TypeWriterController({
  http: { controller },
  type_build,
  config,
}: TServiceParams) {
  controller([config.code_glue.V1, "/type-writer"], app =>
    app.get("/", () => type_build.build()),
  );
}
