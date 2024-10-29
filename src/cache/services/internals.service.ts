import { is, TServiceParams } from "@digital-alchemy/core";
import { Redis } from "ioredis";

import { InternalServerError } from "../../utils";
import {
  createMemoryDriver,
  createRedisDriver,
  ICacheDriver,
  TCache,
} from "../helpers";

export function Cache({
  logger,
  lifecycle,
  config,
  context,
  cache,
}: TServiceParams): TCache {
  let client: ICacheDriver<unknown>;

  // #MARK: onPostConfig
  lifecycle.onPostConfig(async () => {
    logger.debug(
      { name: "onPostConfig", provider: config.cache.CACHE_PROVIDER },
      `init cache`,
    );
    if (config.cache.CACHE_PROVIDER === "redis") {
      client = await createRedisDriver({ config, lifecycle, logger });
      return;
    }
    client = await createMemoryDriver({ config, lifecycle, logger });
  });

  // #MARK: Return object
  return {
    count: (match: string) => {
      if (config.cache.CACHE_PROVIDER !== "redis") {
        throw new InternalServerError(context);
      }
      return new Promise<number>(done => {
        let length = 0;
        const client = cache.internals.getClient<Redis>();
        const stream = client.scanStream({
          count: config.cache.SCAN_CHUNK_SIZE,
          match,
        });
        stream.on("data", keys => {
          length += keys.length;
        });
        stream.on("end", () => {
          done(length);
        });
      });
    },
    del: async (key: string): Promise<void> => {
      await client.del(key);
    },
    get: async <T>(key: string, defaultValue?: T): Promise<T> => {
      const result = await client.get(key);
      return is.undefined(result) ? defaultValue : (result as T);
    },
    getClient: <T>() => client.getClient() as T,
    keys: async (pattern = ""): Promise<string[]> => await client.keys(pattern),
    set: async <T>(
      key: string,
      value: T,
      ttl = config.cache.DEFAULT_CACHE_TTL,
    ): Promise<void> => {
      await client.set(key, value, ttl);
    },
    state: () => {
      if (config.cache.CACHE_PROVIDER === "memory") {
        return `healthy`;
      }
      const client = cache.internals.getClient<Redis>();
      return client.status === "ready" ? "healthy" : "unhealthy";
    },
  } as TCache;
}
