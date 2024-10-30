import { TServiceParams } from "@digital-alchemy/core";
import { InjectOptions } from "fastify";

export function HttpInject({ http }: TServiceParams) {
  return function (options: InjectOptions) {
    return http.bindings.httpServer.inject(options);
  };
}
