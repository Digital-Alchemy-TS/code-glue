import { CreateApplication } from "@digital-alchemy/core";
import { LIB_HASS } from "@digital-alchemy/hass";
import { LIB_TERMINAL } from "@digital-alchemy/terminal";

import { CLIEntry, CLISynapseService, RestAPIService } from "./services";

export const CLI_APP = CreateApplication({
  configuration: {
    BASE_URL: {
      default: "http://localhost:3000",
      type: "string",
    },
  },
  libraries: [LIB_TERMINAL, LIB_HASS],
  name: "cli",
  services: {
    api: RestAPIService,
    entry: CLIEntry,
    synapse: CLISynapseService,
  },
});

declare module "@digital-alchemy/core" {
  export interface LoadedModules {
    cli: typeof CLI_APP;
  }
}