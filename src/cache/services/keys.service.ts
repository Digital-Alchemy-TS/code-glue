import { TServiceParams } from "@digital-alchemy/core";

export function CacheKeys({ cache }: TServiceParams) {
  return async function (pattern = ""): Promise<string[]> {
    return await cache.internals.keys(pattern);
  };
}
