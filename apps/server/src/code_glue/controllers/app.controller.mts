import { is, TServiceParams } from "@digital-alchemy/core";
import { readFileSync } from "fs";

import { BadRequestError, NotImplementedError } from "../../utils/index.mts";

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
      .get("/type-writer", () => type_build.build())
      .get("/types-block", (): string => {
        if (is.empty(config.code_glue.HEADER_CONTENT_FILE)) {
          throw new BadRequestError(context, "SET YOUR CONFIG VARS!");
        }
        return readFileSync(config.code_glue.HEADER_CONTENT_FILE, "utf8");
      }),
  );
}
