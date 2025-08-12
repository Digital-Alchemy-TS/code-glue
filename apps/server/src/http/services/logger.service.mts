import { TServiceParams } from "@digital-alchemy/core";
import { FastifyBaseLogger } from "fastify";
import { v4 } from "uuid";

const NOOP = () => {};

export function HttpLogger({
  logger,
  als,
  http,
  internal: { boot },
}: TServiceParams) {
  const loggerInstance = {
    child() {
      if (boot.phase !== "running") {
        return loggerInstance;
      }
      als.enterWith({ logs: { logger: undefined, requestId: v4() } });
      return loggerInstance;
    },
    debug: NOOP,
    error: logger.error.bind(logger),
    fatal: logger.fatal.bind(logger),
    info: NOOP,
    level: "info",
    silent: NOOP,
    trace: NOOP,
    warn: logger.warn.bind(logger),
    get msgPrefix(): string | undefined {
      return undefined;
    },
  } as FastifyBaseLogger;

  http.bindings.configure({ loggerInstance });
}
