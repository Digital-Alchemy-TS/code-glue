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
        reply
          .status(error.statusCode)
          .send({ error: error.message, status_code: error.statusCode });
      },
    );
  }
  return { setup };
}
