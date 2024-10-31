import { eachSeries, is, TServiceParams } from "@digital-alchemy/core";

import { CachePrefixes } from "../helpers";

export function CacheMetrics({
  config,
  scheduler,
  metrics,
  cache,
}: TServiceParams) {
  if (!config.cache.EMIT_CACHE_STATS) {
    return;
  }
  scheduler.setInterval(async () => {
    await eachSeries(is.keys(CachePrefixes), async (prefix: string) => {
      const count = await cache.internals.count(`${prefix}:*`);
      metrics.emit("cache-stats", { count, prefix });
    });
  }, config.metrics.SYSTEM_STATS_INTERVAL);
}
