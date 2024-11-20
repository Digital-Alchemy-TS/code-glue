import { LIB_AUTOMATION } from "@digital-alchemy/automation";
import { CreateApplication } from "@digital-alchemy/core";
import { LIB_HASS } from "@digital-alchemy/hass";
import { LIB_SYNAPSE } from "@digital-alchemy/synapse";
import { LIB_TYPE_BUILD } from "@digital-alchemy/type-writer";

import { LIB_CACHE } from "../cache/index.mts";
import { LIB_COORDINATOR } from "../coordinator/index.mts";
import { LIB_DATABASE } from "../database/index.mts";
import { LIB_HTTP } from "../http/index.mts";
import { LIB_METRICS } from "../metrics/index.mts";
import {
  AppController,
  AutomationController,
  SynapseEntitiesController,
  VariablesController,
} from "./controllers/index.mts";

export const CODE_GLUE_APP = CreateApplication({
  configuration: {
    V1: {
      default: "/api/v1",
      description: "Route prefix for all controllers in this module",
      type: "string",
    },
  },

  libraries: [
    LIB_CACHE,
    LIB_DATABASE,
    LIB_HASS,
    LIB_SYNAPSE,
    LIB_TYPE_BUILD,
    LIB_COORDINATOR,
    LIB_AUTOMATION,
    LIB_METRICS,
    LIB_HTTP,
  ],
  name: "code_glue",
  services: {
    AppController,
    AutomationController,
    SynapseEntitiesController,
    VariablesController,
  },
});

declare module "@digital-alchemy/core" {
  export interface LoadedModules {
    /**
     * For binding the controllers to the imported libraries
     */
    code_glue: typeof CODE_GLUE_APP;
  }

  export interface DeclaredEnvironments {
    /**
     * deployed container
     */
    prod: true;
    /**
     * unit tests
     */
    test: true;
    /**
     * yarn start
     */
    local: true;
  }
}
