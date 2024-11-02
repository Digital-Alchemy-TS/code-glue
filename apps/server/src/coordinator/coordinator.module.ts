import { CreateLibrary } from "@digital-alchemy/core";

import {
  ContextBuilder,
  ExecuteService,
  LoaderService,
  SynapseEntitiesService,
} from "./services";

export const LIB_COORDINATOR = CreateLibrary({
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
