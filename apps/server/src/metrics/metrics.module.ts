import { CreateLibrary, SECOND } from "@digital-alchemy/core";

import {
  MetricsAlert,
  MetricsEmit,
  MetricsMeasure,
  MetricsPerformance,
} from "./services";

export const LIB_METRICS = CreateLibrary({
  configuration: {
    EMIT_ALERT: {
      default: false,
      description: "metrics.alert toggle",
      type: "boolean",
    },
    EMIT_METRICS: {
      default: true,
      description: "metrics.emit toggle",
      type: "boolean",
    },
    PERFORMANCE_PRECISION: {
      default: 3,
      description: "Rounding precision for after the decimal. 3 = 0.xxx",
      type: "number",
    },
    SYSTEM_STATS_INTERVAL: {
      default: 15 * SECOND,
      description: "In ms",
      type: "number",
    },
  },

  name: "metrics",
  services: {
    /**
     * Emit messages from the application directed at the squishy humans directly
     */
    alert: MetricsAlert,
    /**
     * emit a piece of data intended for use on a dashboard somewhere
     */
    emit: MetricsEmit,
    /**
     * measure the execution time of a function, then emit metric
     */
    measure: MetricsMeasure,
    /**
     * simple wrapper for calculating execution time between two points
     */
    perf: MetricsPerformance,
  },
});

declare module "@digital-alchemy/core" {
  export interface LoadedModules {
    /**
     * General tools for emitting specialized messages for dashboards and communicating information to humans
     */
    metrics: typeof LIB_METRICS;
  }
}
