import { CODE_GLUE_APP } from "../../code_glue";

await CODE_GLUE_APP.bootstrap({
  configSources: {
    argv: false,
    env: true,
    file: true,
  },
  configuration: {
    boilerplate: {
      LOG_LEVEL: "debug",
    },
    cache: {
      CACHE_PROVIDER: "redis",
      ENABLE_MEASURE_CACHE: true,
    },
    http: {
      ATTACH_STANDARD_MIDDLEWARE: false,
    },
  },
  loggerOptions: {
    als: true,
    levelOverrides: {
      "cache.metrics": "silent",
    },
  },
  showExtraBootStats: false,
});
