import { is, MINUTE, TServiceParams } from "@digital-alchemy/core";
import { Type } from "@sinclair/typebox";

import { BadRequestError } from "../../utils/index.mts";

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

enum LogLevel {
  trace = "trace",
  debug = "debug",
  info = "info",
  warn = "warn",
  error = "error",
  fatal = "fatal",
}

type BaseLogLine = UserProvidedData & {
  msg: string;
  context: string;
  level: keyof typeof LOG_LEVEL_PRIORITY;
  timestamp: number;
};

export type LogSearchParams = typeof LogSearchParams.static;
export const LogSearchParams = Type.Object({
  context: Type.Optional(Type.String()),
  level: Type.Optional(
    Type.String({
      enum: ["trace", "debug", "info", "warn", "error", "fatal"],
    }),
  ),
});

export function CodeGlueLogger({
  internal,
  scheduler,
  config,
  context,
  logger,
}: TServiceParams) {
  const messages = new Set<BaseLogLine>();
  logger.info({ name: CodeGlueLogger }, "Registering log target");
  internal.boilerplate.logger.addTarget((msg, data) => {
    logger.trace(
      { msg, context: data?.context },
      "[CodeGlueLogger] Captured log",
    );
    messages.add({
      ...data,
      msg,
      timestamp: Date.now(),
    } as BaseLogLine);
  });

  scheduler.setInterval(() => {
    const cutoff =
      Date.now() - config.code_glue.LOG_STORAGE_DURATION_MINUTE * MINUTE;
    messages.forEach(i => {
      // Fix: delete logs OLDER than cutoff, not newer
      if (i.timestamp < cutoff) {
        messages.delete(i);
      }
    });
  }, MINUTE);

  return function (params: LogSearchParams) {
    let list = [...messages.values()];
    logger.debug(
      { count: list.length, params },
      "[CodeGlueLogger] Fetching logs",
    );
    if (!is.empty(params.context)) {
      list = list.filter(i => i.context === params.context);
    }
    if (!is.empty(params.level)) {
      const priority = LOG_LEVEL_PRIORITY[params.level];
      if (!is.number(priority)) {
        throw new BadRequestError(context, "Bad log level");
      }
      list = list.filter(i => LOG_LEVEL_PRIORITY[i.level] >= priority);
    }
    return list;
  };
}
