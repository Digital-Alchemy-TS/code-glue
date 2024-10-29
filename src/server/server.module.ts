import { LIB_AUTOMATION } from "@digital-alchemy/automation";
import { CreateApplication } from "@digital-alchemy/core";
import { LIB_HASS } from "@digital-alchemy/hass";
import { LIB_SYNAPSE } from "@digital-alchemy/synapse";

import { LIB_CACHE } from "../cache";
import { LIB_DATABASE } from "../database";
import { LIB_ELYSIA } from "../elysia";
import { LIB_METRICS } from "../metrics";
import {
  AppController,
  AutomationController,
  EntitiesController,
  VariablesController,
} from "./controllers";

export const CODE_GLUE_APP = CreateApplication({
  configuration: {
    ROUTE_PREFIX: {
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
    LIB_AUTOMATION,
    LIB_METRICS,
    LIB_ELYSIA,
  ],
  name: "code_glue",
  services: {
    AppController,
    AutomationController,
    EntitiesController,
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
