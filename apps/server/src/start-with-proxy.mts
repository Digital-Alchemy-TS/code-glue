#!/usr/bin/env node
import { spawn } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set ports
const PROXY_PORT = process.env.PORT || "3789";
const APP_PORT = process.env.TARGET_PORT || "3790";

console.log(
  `Starting Code Glue with proxy on port ${PROXY_PORT}, app on port ${APP_PORT}`,
);

// Start the proxy
const proxy = spawn("node", [join(__dirname, "proxy.mjs")], {
  env: {
    ...process.env,
    PORT: PROXY_PORT,
    TARGET_PORT: APP_PORT,
    INGRESS_PATH: process.env.INGRESS_PATH,
  },
  stdio: "inherit",
});

// Start the main app
const app = spawn(
  "npx",
  ["tsx", join(__dirname, "app/environments/prod/main.mjs")],
  {
    env: {
      ...process.env,
      PORT: APP_PORT,
    },
    stdio: "inherit",
  },
);

// Handle shutdown
process.on("SIGTERM", () => {
  console.log("Shutting down...");
  proxy.kill("SIGTERM");
  app.kill("SIGTERM");
});

process.on("SIGINT", () => {
  console.log("Shutting down...");
  proxy.kill("SIGINT");
  app.kill("SIGINT");
});

// Handle child process exits
proxy.on("exit", code => {
  console.log(`Proxy exited with code ${code}`);
  app.kill();
  process.exit(code);
});

app.on("exit", code => {
  console.log(`App exited with code ${code}`);
  proxy.kill();
  process.exit(code);
});
