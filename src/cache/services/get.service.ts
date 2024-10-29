import { TServiceParams } from "@digital-alchemy/core";

export function CacheGet({ cache }: TServiceParams) {
  return async function <T>(key: string, defaultValue?: T): Promise<T> {
    return await cache.internals.get(key, defaultValue);
  };
}
