import { TServiceParams } from "@digital-alchemy/core";

import { AppMetricsTypes } from "../helpers";

export function MetricsEmit({ config, logger }: TServiceParams) {
  return function (type: AppMetricsTypes, data: object) {
    if (!config.metrics.EMIT_METRICS) {
      return;
    }
    logger.info({ ...data, metric: type }, `metrics-${type}`);
  };
}
