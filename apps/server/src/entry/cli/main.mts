import { CLI_APP } from "../../cli";

await CLI_APP.bootstrap({
  configuration: {
    boilerplate: {
      LOG_LEVEL: "silent",
    },
  },
});
