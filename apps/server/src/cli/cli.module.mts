import { CreateApplication } from "@digital-alchemy/core";
import { LIB_HASS } from "@digital-alchemy/hass";
import { LIB_TERMINAL } from "@digital-alchemy/terminal";

import {
  AutomationsService,
  CLIEntry,
  CLISynapseService,
  RestAPIService,
} from "./services/index.mts";

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
    automations: AutomationsService,
    entry: CLIEntry,
    synapse: CLISynapseService,
  },
});

declare module "@digital-alchemy/core" {
  export interface LoadedModules {
    cli: typeof CLI_APP;
  }
}
