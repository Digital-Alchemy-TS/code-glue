import "../utils/helpers";

import {
  ApplicationDefinition,
  createModule,
  iTestRunner,
  LibraryDefinition,
  OptionalModuleConfiguration,
  ServiceMap,
  TServiceParams,
} from "@digital-alchemy/core";

import { LIB_TESTING } from "./testing.module.mts";

export type BaseTestRunner = iTestRunner<
  ServiceMap,
  OptionalModuleConfiguration
>;

export const unitTestRunner = <
  S extends ServiceMap,
  C extends OptionalModuleConfiguration,
>(
  runner: LibraryDefinition<S, C> | ApplicationDefinition<S, C>,
): BaseTestRunner =>
  (runner.type === "application"
    ? createModule.fromApplication(runner)
    : createModule.fromLibrary(runner)
  )
    .extend()
    .toTest()
    .appendLibrary(LIB_TESTING)
    // these values are required, but specific value does not matter to tests
    // if it does, the test will call configure again to override
    .configure({})
    // use no config sources by default
    .setOptions({ configSources: {} });

export const extractParams = async (runner: BaseTestRunner) =>
  new Promise<TServiceParams>(done => runner.run(done));
