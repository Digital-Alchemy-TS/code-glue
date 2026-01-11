#!/usr/bin/env node
import type { ClientRequest, IncomingMessage } from "http";
// @ts-expect-error - express types not needed for build
import express from "express";
import { createProxyMiddleware, Options } from "http-proxy-middleware";

const app = express();
const port = parseInt(process.env.PORT || "3789");
const targetPort = parseInt(process.env.TARGET_PORT || "3790"); // Your actual app runs on this port

// Middleware to strip ingress prefix automatically
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Auto-detect Home Assistant ingress pattern: /api/hassio_ingress/{TOKEN}/...
    const ingressMatch = req.url.match(/^\/api\/hassio_ingress\/[^/]+/);
    if (ingressMatch) {
      const ingressPrefix = ingressMatch[0];
      req.url = req.url.slice(ingressPrefix.length) || "/";
      // Store the ingress prefix for potential use in response rewriting
      req.headers["x-ingress-path"] = ingressPrefix;
    }
    next();
  },
);

// Create proxy middleware options
const proxy = createProxyMiddleware({
  changeOrigin: true,
  onProxyReq: (proxyReq: ClientRequest, req: IncomingMessage) => {
    // Add the original ingress path as a header for the target app
    const ingressPath = req.headers["x-ingress-path"];
    if (ingressPath) {
      proxyReq.setHeader("x-original-ingress-path", ingressPath);
    }
  },
  onProxyRes: (proxyRes: IncomingMessage, req: IncomingMessage) => {
    // Rewrite location headers if needed
    const location = proxyRes.headers.location;
    if (location && req.headers["x-ingress-path"]) {
      const ingressPath = req.headers["x-ingress-path"];
      if (location.startsWith("/")) {
        proxyRes.headers.location = ingressPath + location;
      }
    }
  },
  pathRewrite: {},
  target: `http://localhost:${targetPort}`,
} as Options);

app.use("/", proxy);

app.listen(port, () => {
  console.log(
    `Ingress proxy listening on port ${port}, forwarding to ${targetPort}`,
  );
});
