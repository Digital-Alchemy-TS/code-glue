import { TServiceParams } from "@digital-alchemy/core";

export function MetricsAlert({ logger, config }: TServiceParams) {
  return function (type: string, message: string, data?: object) {
    if (!config.metrics.EMIT_ALERT) {
      return;
    }
    logger.warn({ ...data, type }, message);
  };
}
