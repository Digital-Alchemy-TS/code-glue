import { EventEmitter } from "node:events";

import { is, MINUTE, type TServiceParams } from "@digital-alchemy/core";
import { Type } from "@sinclair/typebox";

import { BadRequestError, LogLevel } from "../../utils/index.mts";

type UserProvidedData = Record<string, unknown>;

const LOG_LEVEL_PRIORITY = {
  debug: 20,
  error: 50,
  fatal: 60,
  info: 30,
  silent: 100,
  trace: 10,
  warn: 40,
} as const;

type BaseLogLine = UserProvidedData & {
  msg: string;
  context: string;
  level: keyof typeof LOG_LEVEL_PRIORITY;
  timestamp: number;
};

export type LogSearchParams = typeof LogSearchParams.static;
export const LogSearchParams = Type.Object({
  context: Type.Optional(Type.Union([Type.String(), Type.Array(Type.String())])),
  level: Type.Optional(
    Type.String({
      enum: Object.values(LogLevel),
    }),
  ),
});

export function CodeGlueLogger({ internal, scheduler, config, context, logger }: TServiceParams) {
  const messages = new Set<BaseLogLine>();
  const logEmitter = new EventEmitter();

  logger.info({ name: CodeGlueLogger }, "Registering log target");
  internal.boilerplate.logger.addTarget((msg, data) => {
    const logLine = {
      ...data,
      msg,
      timestamp: Date.now(),
    } as BaseLogLine;
    messages.add(logLine);
    logEmitter.emit("log", logLine);
  });

  scheduler.setInterval(() => {
    const cutoff = Date.now() - config.code_glue.LOG_STORAGE_DURATION_MINUTE * MINUTE;
    messages.forEach(i => {
      if (i.timestamp < cutoff) {
        messages.delete(i);
      }
    });
  }, MINUTE);

  function search(params: LogSearchParams) {
    let list = [...messages.values()];
    if (!is.empty(params.context)) {
      const contexts = Array.isArray(params.context) ? params.context : [params.context];
      // Include both base context and dynamic: prefixed version
      const expandedContexts = contexts.flatMap(ctx => [ctx, `dynamic:${ctx}`]);
      list = list.filter(i => expandedContexts.includes(i.context));
    }
    if (!is.empty(params.level)) {
      const priority = LOG_LEVEL_PRIORITY[params.level as keyof typeof LOG_LEVEL_PRIORITY];
      if (!is.number(priority)) {
        throw new BadRequestError(context, "Bad log level");
      }
      list = list.filter(i => LOG_LEVEL_PRIORITY[i.level] >= priority);
    }
    return list;
  }

  function subscribe(callback: (log: BaseLogLine) => void): () => void {
    logEmitter.on("log", callback);
    return () => logEmitter.off("log", callback);
  }

  // For backward compatibility, make the search function callable directly
  const service = search as typeof search & {
    search: typeof search;
    subscribe: typeof subscribe;
  };
  service.search = search;
  service.subscribe = subscribe;

  return service;
}
