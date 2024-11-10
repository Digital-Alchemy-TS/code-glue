import { CODE_GLUE_APP } from "../../code_glue";

await CODE_GLUE_APP.bootstrap({
  configSources: {
    argv: false,
    env: true,
    file: true,
  },
  configuration: {
    boilerplate: {
      LOG_LEVEL: "info",
    },
    metrics: {
      EMIT_METRICS: false,
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
