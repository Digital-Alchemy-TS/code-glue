import { CLI_APP } from "../../cli/cli.module.mts";

await CLI_APP.bootstrap({
  configuration: {
    boilerplate: {
      LOG_LEVEL: "silent",
    },
  },
});
