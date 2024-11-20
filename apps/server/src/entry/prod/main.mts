import { CODE_GLUE_APP } from "../../code_glue/index.mts";

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
