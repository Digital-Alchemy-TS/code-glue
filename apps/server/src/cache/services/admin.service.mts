import { is, TServiceParams } from "@digital-alchemy/core";
import { Redis } from "ioredis";

import { BadRequestError } from "../../utils/index.mts";
import { CachePrefixes } from "../helpers/index.mts";

export function CacheAdmin({
  cache: { internals },
  metrics,
  config,
  context,
}: TServiceParams) {
  return {
    async purgeByType(prefix: string) {
      const valid = Object.values(CachePrefixes).some(i =>
        prefix.startsWith(i),
      );
      if (!valid) {
        throw new BadRequestError(context, `invalid cache prefix ${prefix}`);
      }
      const match = `${prefix}:*`;
      const count = await internals.count(match);

      metrics.alert("cache-purge", `removing cache items`, { count, prefix });
      const client = internals.getClient<Redis>();

      return new Promise<void>(done => {
        client
          .scanStream({ count: config.cache.SCAN_CHUNK_SIZE, match })
          .on("data", keys => {
            if (!is.empty(keys)) {
              client.unlink(keys);
            }
          })
          .on("end", () => done());
      });
    },
    async truncate() {
      const client = internals.getClient<Redis>();
      let removed = 0;
      metrics.alert("truncate-purge-start", "truncate redis start");
      await new Promise<void>(done => {
        client
          .scanStream({
            count: config.cache.SCAN_CHUNK_SIZE,
            match: `*`,
          })
          .on("data", keys => {
            if (!is.empty(keys)) {
              removed += keys.length;
              client.unlink(keys);
            }
          })
          .on("end", () => done());
      });
      metrics.alert("truncate-purge-complete", `truncate cache complete`, {
        removed,
      });
    },
  };
}
