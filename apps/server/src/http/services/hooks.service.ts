import { AsyncLogData, is, TServiceParams } from "@digital-alchemy/core";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { FastifyInstance, FastifyRequest } from "fastify";

import { BadRequestError, RequestHeaders } from "../../utils";
import { RequestLocals, ResponseHeaders } from "../types";
/**
 * Extract headers values and attach to logs
 */
const ALS_HEADER_LOGS = new Map<RequestHeaders, keyof AsyncLogData>([
  [RequestHeaders.correlationId, "correlationId"],
]);

const REQUIRED_HEADERS = new Set<RequestHeaders>();

export function HttpHooks({ logger, als, metrics, context }: TServiceParams) {
  async function gatherLocals(req: FastifyRequest): Promise<RequestLocals> {
    logger.trace({ name: gatherLocals }, "gathering data");
    const trace: Partial<Record<RequestHeaders, string>> = {};
    // * track down expected headers + ensure presence
    Object.values(RequestHeaders).forEach(i => {
      const value = req.headers[i];
      if (REQUIRED_HEADERS.has(i) && is.undefined(value)) {
        throw new BadRequestError(context, `Missing expected header: ${i}`);
      }
      if (is.string(value)) {
        trace[i] = value.toString();
      }
    });

    return {
      perf: metrics.perf(),
      trace,
    };
  }

  async function setup(fastify: FastifyInstance) {
    await fastify.register(swagger, {
      openapi: {
        components: {
          securitySchemes: {
            apiKey: {
              in: "header",
              name: "apiKey",
              type: "apiKey",
            },
          },
        },
        externalDocs: {
          description: "Find more info here",
          url: "https://swagger.io",
        },
        info: {
          description: "Testing the Fastify swagger API",
          title: "Test swagger",
          version: "0.1.0",
        },
        openapi: "3.0.0",
        servers: [
          {
            description: "Development server",
            url: "http://localhost:3000",
          },
        ],
        tags: [
          {
            description: "Related to the Synapse entities system",
            name: "synapse",
          },
          { description: "Code related end-points", name: "code" },
        ],
      },
    });

    await fastify.register(swaggerUI, {
      routePrefix: "/swagger",
      staticCSP: true,
      transformSpecification: (swaggerObject, request, reply) => {
        return swaggerObject;
      },
      transformSpecificationClone: true,
      transformStaticCSP: header => header,
      uiConfig: {
        deepLinking: false,
        docExpansion: "full",
      },
      uiHooks: {
        onRequest: function (request, reply, next) {
          next();
        },
        preHandler: function (request, reply, next) {
          next();
        },
      },
    });

    fastify.addHook("onRoute", function onRoute(route) {
      // * during startup, identify routes
      logger.debug({ name: onRoute }, "[%s] {%s}", route.method, route.url);
    });

    fastify.addHook("onRequest", async (req, res) => {
      // * merge request data into storage
      const http = await gatherLocals(req);
      const storage = als.getStore();
      if (storage) {
        res.header(ResponseHeaders.requestId, storage.logs.requestId);
        storage.http = http;

        // * extract keys that are supposed to be in logs and append there also
        const keys: string[] = [];
        is.keys(http.trace).forEach(i => {
          const key = ALS_HEADER_LOGS.get(i);
          if (key) {
            storage.logs[key] = http.trace[i];
            keys.push(key);
          }
        });
        // * confirm keys
        logger.debug({ keys }, "onRequest");
      }
    });

    fastify.addHook("onResponse", async function postRequest(req, res) {
      // * end of request stats
      logger.trace({ name: postRequest }, "onResponse");

      metrics.emit("http-stats", {
        code: res.statusCode,
        method: req.method,
        ms: res.elapsedTime,
        url: req.url,
      });
    });
  }

  return { setup };
}
