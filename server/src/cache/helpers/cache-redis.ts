import { is } from "@digital-alchemy/core";
import Redis, { RedisOptions } from "ioredis";

import { CacheDriverOptions, ICacheDriver } from "..";

const MS_EXPIRATION = "PX";
/**
 * Exported so unit tests can properly disconnect
 */
export let redisClient: Redis;

/**
 * url & name properties automatically generated from config
 */
export async function createRedisDriver(
  { logger, config, lifecycle }: CacheDriverOptions,
  options?: RedisOptions,
): Promise<ICacheDriver<Redis>> {
  if (!redisClient) {
    lifecycle.onPostConfig(async () => {
      redisClient = new Redis(config.cache.REDIS_URL, options);

      redisClient.on("connect", () => {
        logger.info("redis connected");
      });

      redisClient.on("ready", () => {
        logger.info("redis ready");
      });

      redisClient.on("reconnecting", () => {
        logger.warn("redis reconnecting");
      });

      redisClient.on("end", () => {
        logger.error("redis connection ended");
      });
    });
  }

  return {
    async del(key: string) {
      await redisClient.del(key);
    },
    async get<T>(key: string, defaultValue?: T): Promise<T | undefined> {
      const out = await redisClient.get(key);
      if (out !== null && is.string(out)) {
        return JSON.parse(out) as T;
      }
      return defaultValue;
    },
    getClient: () => redisClient,
    async keys(pattern?: string) {
      return await redisClient.keys(pattern || "*");
    },
    async set<T>(key: string, value: T, ttl: number) {
      await redisClient.set(key, JSON.stringify(value), MS_EXPIRATION, ttl);
    },
  };
}
