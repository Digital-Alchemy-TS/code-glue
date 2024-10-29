import { is, TServiceParams } from "@digital-alchemy/core";
import { Headers } from "undici-types";

import { BadRequestError } from "../../utils";
import { RequestLocals } from "../helpers";

export function SessionService({ metrics, logger, context }: TServiceParams) {
  function getSessionId(headers: Headers) {
    const authHeader = headers.get("authorization");
    if (is.empty(authHeader)) {
      return undefined;
    }
    const [type, sessionId] = authHeader.split(" ");
    if (type === "Bearer" && !is.empty(sessionId)) {
      return Buffer.from(sessionId, "base64").toString();
    }
    throw new BadRequestError(context, "Invalid auth header");
  }

  async function gatherLocals(request: Request): Promise<RequestLocals> {
    logger.trace(
      { headers: request.headers, name: gatherLocals },
      "gathering data",
    );
    return {
      perf: metrics.perf(),
    };
  }

  return { gatherLocals, getSessionId };
}
