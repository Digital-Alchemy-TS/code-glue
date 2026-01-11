import { CODE_GLUE_APP } from "../../app.module.mjs";

// Prebuilt environment for production containers
// Runs everything in a single process, serves static files
await CODE_GLUE_APP.bootstrap({
  configSources: {
    argv: false,
    env: true,
    file: false,
  },
  configuration: {
    boilerplate: {
      // Capture all logs for API access (console output controlled by logger transport)
      LOG_LEVEL: "trace",
    },
  },
  loggerOptions: {
    als: true,
    pretty: false,
  },
  showExtraBootStats: false,
});
