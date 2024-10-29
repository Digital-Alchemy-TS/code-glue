import { TServiceParams } from "@digital-alchemy/core";

export function CacheSet({ cache, config }: TServiceParams) {
  return async function <T>(
    key: string,
    value: T,
    ttl = config.cache.DEFAULT_CACHE_TTL,
  ): Promise<void> {
    return await cache.internals.set(key, value, ttl);
  };
}
