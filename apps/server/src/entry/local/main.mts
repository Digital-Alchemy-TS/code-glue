import { CODE_GLUE_APP } from "../../code_glue/server.module.mts";

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
    http: {
      ATTACH_STANDARD_MIDDLEWARE: true,
    },
    metrics: {
      EMIT_METRICS: false,
    },
  },
  loggerOptions: {
    als: true,
  },
  showExtraBootStats: false,
});