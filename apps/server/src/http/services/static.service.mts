import { TServiceParams } from "@digital-alchemy/core";
import fastifyStatic from "@fastify/static";
import { existsSync } from "fs";
import path from "path";

export function StaticFileService({ logger, lifecycle, http }: TServiceParams) {
  lifecycle.onBootstrap(async function onBootstrap() {
    // Check if we should serve static files
    const isProduction = process.env.NODE_ENV === "production";
    const serveStatic = process.env.SERVE_STATIC === "true";

    if (!isProduction && !serveStatic) {
      logger.debug("Client static file serving disabled - development mode");
      return;
    }

    logger.info("Enabling static file serving for client files");

    // Support both local development and container paths
    // In dev: cwd is /path/to/code-glue/apps/server, client is at ../../apps/client/dist
    // In container: cwd is /work, client is at /work/apps/client/dist
    let clientPath = path.resolve(process.cwd(), "dist/client");
    if (!existsSync(clientPath)) {
      // Try container path (from monorepo root)
      clientPath = path.resolve(process.cwd(), "apps/client/dist");
      if (!existsSync(clientPath)) {
        // Try local dev path relative to server directory
        clientPath = path.resolve(process.cwd(), "../../apps/client/dist");
      }
    }

    // Register fastify-static plugin for all static assets
    await http.bindings.httpServer.register(fastifyStatic, {
      root: clientPath,
      prefix: '/',
      decorateReply: true,
    });

    http.bindings.httpServer.setNotFoundHandler(async (request, reply) => {
      // API routes get proper 404
      if (request.url.startsWith("/api/")) {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        return reply.code(404).send({ error: "API Route Not Found" });
      }

      // Static assets that weren't found (already handled by fastify-static)
      if (
        request.url.startsWith("/_expo/") ||
        request.url.startsWith("/assets/") ||
        request.url.match(/\.(png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|css|js|json)$/)
      ) {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        return reply.code(404).send({ error: "Asset not found" });
      }

      // For all other routes (SPA routes), serve index.html
      return reply.sendFile("index.html");
    });

    logger.info({ clientPath }, "Client static file serving configured");
  });
}
