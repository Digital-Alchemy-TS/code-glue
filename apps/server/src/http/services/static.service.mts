import { TServiceParams } from "@digital-alchemy/core";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

    // Path to the built client files - dist/client from project root
    const clientPath = path.join(__dirname, "../../../../../dist/client");

    // Register fastify-static plugin
    await http.bindings.httpServer.register(fastifyStatic, {
      prefix: "/",
      root: clientPath, // No prefix
    });

    // Add catch-all route for SPA routing
    http.bindings.httpServer.setNotFoundHandler(async (request, reply) => {
      // Only serve index.html for non-API routes
      if (request.url.startsWith("/api/")) {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        return reply.code(404).send({ error: "Not Found" });
      }

      // For all other routes, serve index.html
      return reply.sendFile("index.html");
    });

    logger.info({ clientPath }, "Client static file serving configured");
  });
}
