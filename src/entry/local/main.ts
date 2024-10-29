import { CODE_GLUE_APP } from "../../server";

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
    elysia: {
      ADMIN_KEY: "super_secret_password",
      CORS: false,
      HELMET: false,
      PORT: 3001,
      SEND_TIMING: true,
      SWAGGER: true,
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
