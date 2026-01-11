import { TServiceParams } from "@digital-alchemy/core";

import { LogSearchParams } from "../services/logger.service.mts";

/**
 * General purpose / 1 off routes
 *
 * - Log searching
 * - Type writer
 * - Code check
 */
export function AppController({
  http: { controller },
  config,
  code_glue,
}: TServiceParams) {
  controller([config.code_glue.V1, "/"], app =>
    app
      .get("/logs", { schema: { querystring: LogSearchParams } }, ({ query }) =>
        code_glue.logger(query),
      )
      .get(
        "/logs/stream",
        { schema: { querystring: LogSearchParams } },
        async (req, reply) => {
          const { context, level } = req.query;

          // Set SSE headers
          reply.raw.setHeader("Content-Type", "text/event-stream");
          reply.raw.setHeader("Cache-Control", "no-cache");
          reply.raw.setHeader("Connection", "keep-alive");
          reply.raw.setHeader("Access-Control-Allow-Origin", "*");

          // Prevent Fastify from automatically closing the connection
          reply.hijack();

          // Send existing logs first
          const existingLogs = code_glue.logger({ context, level });
          reply.raw.write(
            `data: ${JSON.stringify({ type: "initial", logs: existingLogs })}\n\n`,
          );

          // Send keep-alive heartbeat every 15 seconds to prevent connection timeout
          const heartbeatInterval = setInterval(() => {
            try {
              reply.raw.write(`: heartbeat\n\n`);
            } catch (err) {
              // Connection closed, cleanup will happen via 'close' event
            }
          }, 15000);

          // Subscribe to new logs
          const unsubscribe = code_glue.logger.subscribe(log => {
            // Apply filters
            if (context) {
              const contexts = Array.isArray(context) ? context : [context];
              // Include both base context and dynamic: prefixed version
              const expandedContexts = contexts.flatMap(ctx => [ctx, `dynamic:${ctx}`]);
              if (!expandedContexts.includes(log.context)) return;
            }
            if (level) {
              const LOG_LEVEL_PRIORITY: Record<string, number> = {
                trace: 10,
                debug: 20,
                info: 30,
                warn: 40,
                error: 50,
                fatal: 60,
              };
              const priority = LOG_LEVEL_PRIORITY[level];
              const logPriority = LOG_LEVEL_PRIORITY[log.level];
              if (logPriority && logPriority < priority) return;
            }

            // Send log to client
            try {
              reply.raw.write(
                `data: ${JSON.stringify({ type: "log", log })}\n\n`,
              );
            } catch (err) {
              // Connection closed, cleanup will happen via 'close' event
            }
          });

          // Cleanup on client disconnect
          req.raw.on("close", () => {
            clearInterval(heartbeatInterval);
            unsubscribe();
          });
        },
      )
      .get("/type-writer", async () => await code_glue.type_build.build())
      .get("/stats", () => {
        return false;
      })
      .get("/health", () => {
        return {
          status: "ok",
          timestamp: new Date().toISOString(),
        };
      }),
  );
}
