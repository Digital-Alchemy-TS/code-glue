import { LIB_AUTOMATION } from "@digital-alchemy/automation";
import { CreateApplication } from "@digital-alchemy/core";
import { LIB_HASS } from "@digital-alchemy/hass";
import { LIB_SYNAPSE } from "@digital-alchemy/synapse";
import { LIB_TYPE_BUILD } from "@digital-alchemy/type-writer";

import { LIB_COORDINATOR } from "../coordinator/index.mts";
import { LIB_DATABASE } from "../database/index.mts";
import { LIB_HTTP } from "../http/index.mts";
import { LIB_METRICS } from "../metrics/index.mts";
import { LIB_MODULE_PATCHER } from "../patch/patch.module.mts";
import {
  AppController,
  AutomationController,
  SynapseEntitiesController,
  TypesController,
  VariablesController,
} from "./controllers/index.mts";
import { AutomationLogic } from "./services/automation.service.mts";
import { HeaderBlockService } from "./services/header-block.service.mts";
import { CodeGlueLogger } from "./services/logger.service.mts";
import { StatsService } from "./services/stats.service.mts";

export const CODE_GLUE_APP = CreateApplication({
  configuration: {
    HEADER_CONTENT_FILE: {
      type: "string",
    },
    LOG_STORAGE_DURATION_MINUTE: {
      default: 60,
      type: "number",
    },
    V1: {
      default: "/api/v1",
      description: "Route prefix for all controllers in this module",
      type: "string",
    },
  },

  libraries: [
    LIB_DATABASE,
    LIB_HASS,
    LIB_SYNAPSE,
    LIB_TYPE_BUILD,
    LIB_COORDINATOR,
    LIB_MODULE_PATCHER,
    LIB_AUTOMATION,
    LIB_METRICS,
    LIB_HTTP,
  ],
  name: "code_glue",
  priorityInit: ["automation", "header", "logger", "stats"],
  services: {
    AppController,
    AutomationController,
    SynapseEntitiesController,
    TypesController,
    VariablesController,
    automation: AutomationLogic,
    header: HeaderBlockService,
    logger: CodeGlueLogger,
    stats: StatsService,
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
