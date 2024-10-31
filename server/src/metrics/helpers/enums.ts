enum MetricsTypes {
  /**
   * metrics.measure
   */
  performance = "performance",
  /**
   * http module saying things are complete
   */
  http_stats = "http-stats",
}

export type AppMetricsTypes = `${MetricsTypes}`;
