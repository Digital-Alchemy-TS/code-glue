import { TServiceParams } from "@digital-alchemy/core";
import fastifyStatic from "@fastify/static";
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

    const clientPath = path.resolve(process.cwd(), "dist/client");

    // Register fastify-static plugin for all static assets
    await http.bindings.httpServer.register(fastifyStatic, {
      root: clientPath,
    });

    http.bindings.httpServer.setNotFoundHandler(async (request, reply) => {
      if (request.url.startsWith("/api/")) {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        return reply.code(404).send({ error: "API Route Not Found" });
      }

      if (
        request.url.startsWith("/_expo/") ||
        request.url.startsWith("/assets/") ||
        (request.url.includes(".") && !request.url.endsWith(".html"))
      ) {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        return reply.code(404).send({ error: "Asset not found" });
      }

      // For all other routes (app routes), serve index.html
      return reply.sendFile("index.html");
    });

    logger.info({ clientPath }, "Client static file serving configured");
  });
}
