import { TServiceParams } from "@digital-alchemy/core";

export function CacheDel({ cache }: TServiceParams) {
  /**
   * Testing asdf hello world
   */
  return async function (key: string): Promise<void> {
    return await cache.internals.del(key);
  };
}
