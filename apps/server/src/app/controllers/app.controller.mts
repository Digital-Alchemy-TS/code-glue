import { TServiceParams } from "@digital-alchemy/core";

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
  code_glue,
}: TServiceParams) {
  controller([config.code_glue.V1, "/"], app =>
    app
      .get("/logs", { schema: { params: LogSearchParams } }, ({ params }) =>
        code_glue.logger(params),
      )
      .get("/type-writer", () => type_build.build())
      .get("/types/debug", () => code_glue.header.debugBlock())
      .get("/types/hidden", () => code_glue.header.hiddenBlock())
      .get("/stats", () => {
        return false;
      }),
  );
}
