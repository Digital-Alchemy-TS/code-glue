import { CODE_GLUE_APP } from "../../app.module.mts";

await CODE_GLUE_APP.bootstrap({
  configSources: {
    argv: false,
    env: true,
    file: false,
  },
  configuration: {},
  loggerOptions: {
    als: true,
    pretty: false,
  },
  showExtraBootStats: false,
});
