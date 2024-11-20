import { TContext, TServiceParams } from "@digital-alchemy/core";
import { createHash } from "crypto";
import { tag } from "type-fest/source/tagged";

import { CachePrefixes } from "../helpers/index.mts";

const NOT_FOUND = Symbol();

export function CacheMeasure({ metrics, config, cache }: TServiceParams) {
  return async function <T>(
    [context, method]: [context: TContext, method: string],
    cacheBy: unknown[],
    callback: () => T,
  ): Promise<T> {
    if (!config.cache.ENABLE_MEASURE_CACHE) {
      return await metrics.measure([context, method], callback);
    }
    const track = metrics.perf();
    const [module, service] = context.split(":");
    const logData: Record<string, string | number> = {
      cache: "none",
      method,
      module,
      service,
      status: "success",
    };
    try {
      const key = [
        CachePrefixes.api_result,
        tag,
        createHash("sha256")
          .update(JSON.stringify({ cacheBy, context, method }))
          .digest("hex"),
      ].join(":");
      const cached = await cache.get(key, NOT_FOUND);
      if (cached !== NOT_FOUND) {
        logData.cache = "hit";
        return cached as T;
      }
      logData.cache = "miss";
      const result = await callback();
      await cache.set(key, result);
      return result;
    } catch (error) {
      logData.status = "error";
      logData.code = error.status;
      throw error;
    } finally {
      const ms = track();
      logData.ms = ms;
      metrics.emit("performance", logData);
    }
  };
}
