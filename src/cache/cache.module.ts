import { CreateLibrary, DAY, StringConfig } from "@digital-alchemy/core";

import { LIB_METRICS } from "../metrics";
import { CacheProviders } from "./helpers";
import {
  Cache,
  CacheAdmin,
  CacheDel,
  CacheGet,
  CacheKeys,
  CacheMetrics,
  CacheSet,
} from "./services";

export const LIB_CACHE = CreateLibrary({
  configuration: {
    CACHE_PROVIDER: {
      default: "memory",
      enum: ["redis", "memory"],

      type: "string",
    } as StringConfig<`${CacheProviders}`>,
    DEFAULT_CACHE_TTL: {
      default: DAY,
      description: "Configuration property for cache provider, in ms",

      type: "number",
    },
    EMIT_CACHE_STATS: {
      default: false,
      description: "Emit the current cache stats",

      type: "boolean",
    },
    ENABLE_MEASURE_CACHE: {
      default: true,
      description: "cache.measure is allowed to check cache",

      type: "boolean",
    },
    REDIS_URL: {
      default: "redis://localhost:6379",
      description:
        "Configuration property for cache provider, does not apply to memory caching",

      type: "string",
    },
    SCAN_CHUNK_SIZE: {
      default: 100,
      description:
        "Used when scanning through cache data for go fast / memory reasons",

      type: "number",
    },
  },
  depends: [LIB_METRICS],

  name: "cache",
  priorityInit: ["internals"],
  services: {
    admin: CacheAdmin,
    /**
     * Quick wrapper for removing single keys from the cache
     */
    del: CacheDel,
    get: CacheGet,
    internals: Cache,
    keys: CacheKeys,
    metrics: CacheMetrics,
    set: CacheSet,
  },
});

declare module "@digital-alchemy/core" {
  export interface LoadedModules {
    cache: typeof LIB_CACHE;
  }
}
