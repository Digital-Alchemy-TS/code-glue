import { CreateLibrary } from "@digital-alchemy/core";

import { TestingFetch } from "./services/index.mts";

export const LIB_TESTING = CreateLibrary({
  name: "testing",
  services: {
    fetch: TestingFetch,
  },
});

declare module "@digital-alchemy/core" {
  export interface LoadedModules {
    /**
     * Tools for use in unit testing
     */
    testing: typeof LIB_TESTING;
  }
}
