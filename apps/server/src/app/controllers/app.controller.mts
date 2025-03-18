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
  config,
  code_glue,
}: TServiceParams) {
  controller([config.code_glue.V1, "/"], app =>
    app
      .get("/logs", { schema: { params: LogSearchParams } }, ({ params }) =>
        code_glue.logger(params),
      )
      .get("/type-writer", () => code_glue.type_build.build())
      .get("/stats", () => {
        return false;
      }),
  );
}
