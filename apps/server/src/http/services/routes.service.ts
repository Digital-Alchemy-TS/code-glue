import {
  BootstrapException,
  TBlackHole,
  TServiceParams,
} from "@digital-alchemy/core";

import { HttpInstance } from "../types";

type RoutesCallback = (server: HttpInstance) => TBlackHole;

export function FastifyRegister({
  http,
  lifecycle,
  internal,
  context,
}: TServiceParams) {
  /**
   * Route prefix should consist of 2 parts: `[prefix, group]`
   *
   *  > Example: `["/api/v1", "/pbm"]`
   *
   * The 1st part should be from a config file, the 2nd part is coded into the file
   */
  return function controller(
    parts: [prefix: string, group: `/${string}`],
    callback: RoutesCallback,
  ) {
    // enforce some code standards
    if (internal.boot.completedLifecycleEvents.has("PreInit")) {
      throw new BootstrapException(
        context,
        "BAD_BIND_ORDER",
        "Call http.controller during service construction",
      );
    }
    // * bindings aren't actually available until after config
    lifecycle.onBootstrap(() =>
      http.bindings.httpServer.register(async fastify => callback(fastify), {
        prefix: parts.join(""),
      }),
    );
  };
}
