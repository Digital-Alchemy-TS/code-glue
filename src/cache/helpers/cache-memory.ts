import { is } from "@digital-alchemy/core";
import NodeCache from "node-cache";

import { CacheDriverOptions, ICacheDriver } from "./cache";

/**
 * url & name properties automatically generated from config
 */
export function createMemoryDriver(
  { logger, config, lifecycle }: CacheDriverOptions,
  options?: NodeCache.Options,
): ICacheDriver<NodeCache> {
  let client = new NodeCache({
    stdTTL: config.cache.DEFAULT_CACHE_TTL,
    ...options,
  });

  lifecycle.onShutdownStart(() => {
    logger.debug({ name: "onShutdownStart" }, `cleanup`);
    client = undefined;
  });

  return {
    async del(key: string) {
      client.del(key);
    },
    async get<T>(key: string, defaultValue?: T): Promise<T | undefined> {
      const out = client.get(key);
      if (is.string(out)) {
        return JSON.parse(out) as T;
      }
      return defaultValue;
    },
    getClient: () => client,
    async keys(pattern?: string) {
      const allKeys = client.keys();
      return pattern
        ? allKeys.filter(key => new RegExp(pattern).test(key))
        : allKeys;
    },
    async set<T>(key: string, value: T, ttl: number) {
      client.set(key, JSON.stringify(value), ttl);
    },
  };
}
