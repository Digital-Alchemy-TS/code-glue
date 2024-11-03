import { TServiceParams } from "@digital-alchemy/core";
import {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";

export function HttpErrors({ logger }: TServiceParams) {
  function setup(httpServer: FastifyInstance) {
    logger.trace("setup");
    httpServer.setErrorHandler(
      (error: FastifyError, _: FastifyRequest, reply: FastifyReply) => {
        logger.error({ error, ms: reply.elapsedTime }, "fastify caught error");
        if (error.statusCode) {
          reply.status(error.statusCode);
        }
        reply.send({ error: error.message, status_code: error.statusCode });
      },
    );
  }
  return { setup };
}
