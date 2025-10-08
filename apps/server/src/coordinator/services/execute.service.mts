/* eslint-disable sonarjs/code-eval */
import { DOWN, is, TServiceParams, UP } from "@digital-alchemy/core";
import { formatObjectId } from "@digital-alchemy/synapse";
import { createHash } from "crypto";
import { writeFileSync } from "fs";
import { join } from "path";
import { ModuleKind, ScriptTarget, transpileModule } from "typescript";

import { StoredAutomation } from "../../utils/index.mts";

export function ExecuteService({
  coordinator,
  config,
  context,
  logger,
  metrics,
}: TServiceParams) {
  const extraProperties = new Map<string, unknown>([["is", is]]);

  const hashBody = (body: string) =>
    createHash("sha256").update(body).digest("hex");

  /**
   * typescript in, javascript out
   *
   * cache files as a side effect (DON'T MAKE ME VALIDATE THEM ON THE OTHER SIDE!)
   */
  function transpile(
    body: string,
    context: string,
  ): [body: string, hash: string] {
    const hash = hashBody(body);
    const file = join(config.coordinator.TRANSPILE_CACHE_PATH, context);
    const result = transpileModule(body, {
      compilerOptions: {
        module: ModuleKind.ESNext,
        target: ScriptTarget.ESNext,
      },
    });
    if (config.coordinator.TRANSPILE_CACHE) {
      writeFileSync(file, result.outputText, "utf8");
      logger.trace({ hash }, "transpile & write to file");
    }
    return [result.outputText, hash];
  }

  return async function contextLoader(automation: StoredAutomation) {
    // Safety check: if automation is undefined, log and return early
    if (!automation) {
      logger.warn("automation content is undefined, skipping");
      return () => {}; // return a no-op teardown function
    }
    
    // create a log context
    const child = is.empty(automation.context)
      ? formatObjectId(automation.title)
      : automation.context;

    const remover = coordinator.teardown.create(automation.id);

    // build up TServiceParams
    const params = coordinator.context.build(child, remover);

    // create list of keys that will go into fn
    const sortedKeys = is.keys(params).toSorted((a, b) => (a > b ? UP : DOWN));
    const full = [...sortedKeys, ...extraProperties.keys()];

    const [body, hash] = transpile(automation.body, child);

    try {
      //
      // build service
      await metrics.measure([context, contextLoader], async () => {
        const service = new Function(...full, body);
        // execute
        const result = await service(
          ...sortedKeys.map(i => params[i]),
          ...extraProperties.values(),
        );
        if (!is.undefined(result)) {
          logger.warn(
            { context: child },
            "received unexpected output from service definition (ignoring)",
          );
        }
        logger.info({ hash }, "starting service: [%s]", child);
      });
    } catch (error) {
      logger.error(
        { context: child, error },
        `service failed to initialize: ${error}`,
      );
    }
    return remover;
  };
}
