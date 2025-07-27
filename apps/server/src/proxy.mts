#!/usr/bin/env node
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import type { IncomingMessage, ServerResponse } from 'http';

const app = express();
const port = parseInt(process.env.PORT || '3789');
const targetPort = parseInt(process.env.TARGET_PORT || '3790'); // Your actual app runs on this port

// Create proxy middleware
const proxy = createProxyMiddleware({
  target: `http://localhost:${targetPort}`,
  changeOrigin: true,
  pathRewrite: {},
  onProxyReq: (proxyReq: any, req: IncomingMessage, res: ServerResponse) => {
    // Add the original ingress path as a header for the target app
    const ingressPath = req.headers['x-ingress-path'];
    if (ingressPath) {
      proxyReq.setHeader('x-original-ingress-path', ingressPath);
    }
  },
  onProxyRes: (proxyRes: any, req: IncomingMessage, res: ServerResponse) => {
    // Rewrite location headers if needed
    const location = proxyRes.headers.location;
    if (location && req.headers['x-ingress-path']) {
      const ingressPath = req.headers['x-ingress-path'];
      if (location.startsWith('/')) {
        proxyRes.headers.location = ingressPath + location;
      }
    }
  }
} as any);

app.use('/', proxy);

app.listen(port, () => {
  console.log(`Ingress proxy listening on port ${port}, forwarding to ${targetPort}`);
});

