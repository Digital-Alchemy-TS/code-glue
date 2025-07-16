import { TServiceParams } from "@digital-alchemy/core";
import fastifyStatic from "@fastify/static";
import { existsSync, readdirSync } from "fs";
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

    const clientPath = path.resolve(process.cwd(), "dist/client");

    // Check if client directory exists
    if (!existsSync(clientPath)) {
      logger.warn({ clientPath }, "Client directory does not exist");
      return;
    }

    // Register fastify-static plugin for all static assets
    await http.bindings.httpServer.register(fastifyStatic, {
      root: clientPath,
      prefix: "/",
      // Serve index files for directory requests
      index: ["index.html"],
      // Set proper MIME types and caching headers
      setHeaders: (res, path) => {
        // Set cache headers for static assets
        if (path.includes("/_expo/static/")) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else if (path.endsWith(".html")) {
          res.setHeader("Cache-Control", "no-cache");
        }
      },
    });

    // Add catch-all route for SPA routing
    http.bindings.httpServer.setNotFoundHandler(async (request, reply) => {
      // Only serve index.html for non-API routes and non-asset routes
      if (request.url.startsWith("/api/")) {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        return reply.code(404).send({ error: "Not Found" });
      }

      // Don't serve index.html for asset requests that should return 404
      if (request.url.startsWith("/_expo/") || 
          request.url.startsWith("/assets/") || 
          request.url.includes(".") && !request.url.endsWith(".html")) {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        return reply.code(404).send({ error: "Asset not found" });
      }

      // For all other routes (app routes), serve index.html
      return reply.sendFile("index.html");
    });

    logger.info({ clientPath }, "Client static file serving configured");
  });
}
