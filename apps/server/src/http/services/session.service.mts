import { is, TServiceParams } from "@digital-alchemy/core";
import { FastifyRequest } from "fastify";

import { SessionData } from "../types/index.mts";

export function HttpSession({ logger }: TServiceParams) {
  async function load(sessionId: string): Promise<SessionData> {
    logger.debug({ name: load, sessionId }, "load session");
    return undefined;
  }

  function getSessionId(req: FastifyRequest) {
    const authHeader = req.headers.authorization;
    if (is.empty(authHeader)) {
      return undefined;
    }
    const [type, sessionId] = authHeader.split(" ");
    if (type === "Bearer" && !is.empty(sessionId)) {
      return Buffer.from(sessionId, "base64").toString();
    }
    logger.warn({ authHeader }, `invalid auth header`);
    return undefined;
  }

  return {
    getSessionId,
    load,
  };
}
