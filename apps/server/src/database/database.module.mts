import { CreateLibrary } from "@digital-alchemy/core";

import { LIB_METRICS } from "../metrics/index.mts";
import {
  AutomationTable,
  DatabaseInternalsService,
  SynapseEntitiesTable,
  TypesTable,
  VariablesTable,
} from "./services/index.mts";

export const LIB_DATABASE = CreateLibrary({
  configuration: {},
  depends: [LIB_METRICS],
  name: "database",
  services: {
    automation: AutomationTable,
    entity: SynapseEntitiesTable,
    // internal: DatabaseInternalsService,
    types: TypesTable,
    variable: VariablesTable,
  },
});

declare module "@digital-alchemy/core" {
  export interface LoadedModules {
    database: typeof LIB_DATABASE;
  }
}
