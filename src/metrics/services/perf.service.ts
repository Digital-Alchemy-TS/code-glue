import { is, TServiceParams } from "@digital-alchemy/core";

export function MetricsPerformance({ config }: TServiceParams) {
  return function () {
    const start = performance.now();
    return function () {
      return is.fixed_length(
        performance.now() - start,
        config.metrics.PERFORMANCE_PRECISION,
      );
    };
  };
}
