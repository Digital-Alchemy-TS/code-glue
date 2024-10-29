import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  mock,
  spyOn,
} from "bun:test";
import { v4 } from "uuid";

import { BaseTestRunner } from "../../tests";
import { HttpStatus } from "../../utils";
import { RequestHeaders } from "../helpers";
import { createTestRunner } from "./runner";

let testRunner: BaseTestRunner;

beforeEach(() => {
  testRunner = createTestRunner();
});

afterEach(async () => {
  await testRunner?.teardown();
  mock.restore();
});

describe("AdminKey Guard", () => {
  it("blocks no key", async () => {
    await testRunner
      .bootLibrariesFirst()
      .run(async ({ elysia: { app, AdminGuard }, testing: { fetch } }) => {
        const id = v4();
        app.guard({ beforeHandle: AdminGuard }).get("/", id);

        const response = await fetch.response("/");
        expect(response.status).toBe(HttpStatus.HTTP_401_UNAUTHORIZED);
      });
  });

  it("blocks bad key", async () => {
    await testRunner
      .bootLibrariesFirst()
      .run(async ({ elysia: { app, AdminGuard }, testing: { fetch } }) => {
        const id = v4();
        app.guard({ beforeHandle: AdminGuard }).get("/", id);

        const response = await fetch.response("/", {
          headers: {
            [RequestHeaders.admin_key]: v4(),
          },
        });
        expect(response.status).toBe(HttpStatus.HTTP_401_UNAUTHORIZED);
      });
  });

  it("allows good key", async () => {
    await testRunner
      .bootLibrariesFirst()
      .run(
        async ({ config, elysia: { app, AdminGuard }, testing: { fetch } }) => {
          const id = v4();
          app.guard({ beforeHandle: AdminGuard }).get("/", id);

          const response = await fetch.response("/", {
            headers: {
              [RequestHeaders.admin_key]: config.elysia.ADMIN_KEY,
            },
          });
          expect(response.status).toBe(HttpStatus.HTTP_200_OK);
        },
      );
  });
});

describe("middleware", () => {
  it("just bearer by default", async () => {
    await testRunner.run(({ elysia, lifecycle }) => {
      const spy = spyOn(elysia.app, "use");
      lifecycle.onReady(() => {
        expect(spy).toHaveReturnedTimes(1);
      });
    });
  });

  it("+swagger", async () => {
    await testRunner
      .configure({ elysia: { SWAGGER: true } })
      .run(({ elysia, lifecycle }) => {
        const spy = spyOn(elysia.app, "use");
        lifecycle.onReady(() => {
          expect(spy).toHaveBeenCalledTimes(2);
        });
      });
  });

  it("+cors", async () => {
    await testRunner
      .configure({ elysia: { CORS: true } })
      .run(({ elysia, lifecycle }) => {
        const spy = spyOn(elysia.app, "use");
        lifecycle.onReady(() => {
          expect(spy).toHaveBeenCalledTimes(2);
        });
      });
  });

  it("+helmet", async () => {
    await testRunner
      .configure({ elysia: { HELMET: true } })
      .run(({ elysia, lifecycle }) => {
        const spy = spyOn(elysia.app, "use");
        lifecycle.onReady(() => {
          expect(spy).toHaveBeenCalledTimes(2);
        });
      });
  });

  it("+timing", async () => {
    await testRunner
      .configure({ elysia: { SEND_TIMING: true } })
      .run(({ elysia, lifecycle }) => {
        const spy = spyOn(elysia.app, "use");
        lifecycle.onReady(() => {
          expect(spy).toHaveBeenCalledTimes(2);
        });
      });
  });
});

describe("stats", () => {
  it("enters als on request", async () => {
    await testRunner.run(
      async ({ elysia: { app }, testing: { fetch }, als }) => {
        const spy = spyOn(als, "enterWith");

        app.get("/", "test");
        await fetch.response("/");
        expect(spy).toHaveBeenCalled();
      },
    );
  });

  it("emits metrics on complete", async () => {
    await testRunner
      .configure({ metrics: { EMIT_METRICS: true } })
      .run(async ({ elysia: { app }, testing: { fetch }, metrics }) => {
        const spy = spyOn(metrics, "emit");

        app.get("/", "test");
        await fetch.response("/");

        expect(spy).toHaveBeenCalledWith("request-success", expect.any(Object));
      });
  });

  it("emits logs on complete if metrics are disabled", async () => {
    await testRunner.run(
      async ({ elysia: { app }, testing: { fetch }, metrics }) => {
        const spy = spyOn(metrics, "emit");

        app.get("/", "test");
        await fetch.response("/");

        expect(spy).not.toHaveBeenCalled();
      },
    );
  });
});

describe("session", () => {
  it("load", async () => {
    await testRunner.run(async ({ elysia: { session } }) => {
      expect(await session.load("")).toBe(undefined);
    });
  });

  describe("getSessionId", () => {
    it("undefined with no header", async () => {
      await testRunner.run(async ({ elysia: { session } }) => {
        const headers = new Map() as unknown as Headers;
        expect(session.getSessionId(headers)).toBe(undefined);
      });
    });

    it("throws for invalid", async () => {
      await testRunner.run(async ({ elysia: { session } }) => {
        const headers = new Map() as unknown as Headers;
        const id = v4();
        headers.set("authorization", `Bearer ${id}`);
        expect(() => {
          expect(session.getSessionId(headers)).toBe(undefined);
        }).toThrow();
      });
    });

    it("decode valid", async () => {
      await testRunner.run(async ({ elysia: { session } }) => {
        const headers = new Map() as unknown as Headers;
        const id = v4();
        headers.set(
          "authorization",
          `Bearer ${Buffer.from(id).toString("base64")}`,
        );
        expect(session.getSessionId(headers)).toBe(id);
      });
    });
  });
});
