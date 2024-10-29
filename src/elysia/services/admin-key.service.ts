import { TServiceParams } from "@digital-alchemy/core";
import { Request } from "undici-types";

import { UnauthorizedError } from "../../utils";
import { RequestHeaders } from "../helpers";

export function ElysiaAdminKey({ context, config }: TServiceParams) {
  return function ({
    request: { headers },
    store,
  }: {
    request: Request;
    store: { tag: string };
  }) {
    store.tag = "admin";
    const adminKey = headers.get(RequestHeaders.admin_key);
    if (adminKey !== config.elysia.ADMIN_KEY) {
      throw new UnauthorizedError(context, "Admin key does not match config");
    }
  };
}
