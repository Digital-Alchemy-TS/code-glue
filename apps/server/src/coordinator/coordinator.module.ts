import { CreateLibrary } from "@digital-alchemy/core";

import { LIB_DATABASE } from "../database";
import { LIB_MODULE_PATCHER } from "../patch";
import {
  ContextBuilder,
  ExecuteService,
  LoaderService,
  SynapseEntitiesService,
} from "./services";

export const LIB_COORDINATOR = CreateLibrary({
  depends: [LIB_DATABASE, LIB_MODULE_PATCHER],
  name: "coordinator",
  services: {
    context: ContextBuilder,
    entities: SynapseEntitiesService,
    execute: ExecuteService,
    loader: LoaderService,
  },
});
declare module "@digital-alchemy/core" {
  export interface LoadedModules {
    coordinator: typeof LIB_COORDINATOR;
  }
}
