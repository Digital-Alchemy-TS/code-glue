import {
  iTestRunner,
  OptionalModuleConfiguration,
  ServiceMap,
} from "@digital-alchemy/core";

import { unitTestRunner } from "../../tests";
import { LIB_HTTP } from "../http.module";

let testRunner: iTestRunner<ServiceMap, OptionalModuleConfiguration>;

beforeEach(() => {
  testRunner = unitTestRunner(LIB_HTTP);
});

afterEach(async () => {
  if (testRunner) {
    await testRunner.teardown();
  }
  jest.restoreAllMocks();
});

describe("Lifecycle", () => {
  it("close at onShutdownStart", async () => {
    expect.assertions(1);
    let spy: jest.SpyInstance;

    await testRunner.run(({ http, lifecycle }) => {
      lifecycle.onReady(() => {
        spy = jest.spyOn(http.bindings.httpServer, "close");
      });
    });
    await testRunner.teardown();
    testRunner = undefined;
    expect(spy).toHaveBeenCalled();
  });

  it("does listen at onReady", async () => {
    expect.assertions(2);
    let spy: jest.SpyInstance;

    await testRunner.run(({ http, lifecycle }) => {
      lifecycle.onBootstrap(() => {
        spy = jest.spyOn(http.bindings.httpServer, "listen");
      });
      lifecycle.onReady(() => {
        expect(spy).not.toHaveBeenCalled();
      });
    });
    expect(spy).toHaveBeenCalled();
  });
});
