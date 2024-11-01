import { TServiceParams } from "@digital-alchemy/core";

import { NotImplementedError } from "../../utils";

/**
 * General purpose / 1 off routes
 *
 * - Log searching
 * - Type writer
 * - Code check
 */
export function AppController({
  http: { controller },
  type_build,
  config,
  context,
}: TServiceParams) {
  controller([config.code_glue.V1, "/"], app =>
    app
      .get("/logs", () => {
        throw new NotImplementedError(
          context,
          "https://github.com/Digital-Alchemy-TS/code-glue/issues/9",
        );
      })
      .get("/type-writer", () => type_build.build()),
  );
}
