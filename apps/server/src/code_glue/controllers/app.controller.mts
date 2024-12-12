import { is, TServiceParams } from "@digital-alchemy/core";
import { readFileSync } from "fs";

import { BadRequestError } from "../../utils/index.mts";
import { LogSearchParams } from "../services/logger.service.mts";

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
  code_glue,
}: TServiceParams) {
  controller([config.code_glue.V1, "/"], app =>
    app
      .get("/logs", { schema: { params: LogSearchParams } }, ({ params }) =>
        code_glue.logger(params),
      )
      .get("/type-writer", () => type_build.build())
      .get("/types-block", (): string => {
        if (is.empty(config.code_glue.HEADER_CONTENT_FILE)) {
          throw new BadRequestError(context, "SET YOUR CONFIG VARS!");
        }
        return readFileSync(config.code_glue.HEADER_CONTENT_FILE, "utf8");
      }),
  );
}
