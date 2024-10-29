import { is, TServiceParams } from "@digital-alchemy/core";
import { Headers } from "undici-types";

import { BadRequestError } from "../../utils";
import { RequestLocals, SessionData, TraceHeaders } from "../helpers";

export function SessionService({ metrics, logger, context }: TServiceParams) {
  async function load(sessionId: string): Promise<SessionData> {
    logger.debug({ name: load, sessionId }, "load session");
    return undefined;
  }

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
    const sessionId = getSessionId(request.headers);
    return {
      perf: metrics.perf(),
      session: is.empty(sessionId) ? undefined : await load(sessionId),
      sessionId,
      trace: Object.fromEntries(
        Object.values(TraceHeaders)
          .map(i => [i, request.headers.get(i)])
          .filter(([, value]) => !is.empty(value)),
      ),
    };
  }

  return { gatherLocals, getSessionId, load };
}
