import { TServiceParams } from "@digital-alchemy/core";

export function MetricsPerformance({ config }: TServiceParams) {
  return function () {
    const start = performance.now();
    return function () {
      return Number(
        Number(performance.now() - start).toFixed(
          config.metrics.PERFORMANCE_PRECISION,
        ),
      );
    };
  };
}
