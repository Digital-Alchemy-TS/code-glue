import { CODE_GLUE_APP } from "../../app.module.mts";

import { logger } from "../../logger"; // Assuming a logger module exists

// Debug logging for environment and configuration
logger.info("=== ENVIRONMENT VARIABLES ===");
logger.info("NODE_ENV:", process.env.NODE_ENV);
logger.info("HASS_BASE_URL:", process.env.HASS_BASE_URL);
logger.info("HASS_TOKEN:", process.env.HASS_TOKEN ? "[SET]" : "[NOT SET]");
logger.info("SUPERVISOR_TOKEN:", process.env.SUPERVISOR_TOKEN ? "[SET]" : "[NOT SET]");
logger.info("All env vars with HASS:", Object.keys(process.env).filter(key => key.includes('HASS')));
logger.info("All env vars with SUPERVISOR:", Object.keys(process.env).filter(key => key.includes('SUPERVISOR')));
logger.info("==============================");

await CODE_GLUE_APP.bootstrap({
  configSources: {
    argv: false,
    env: true,
    file: false,
  },
  configuration: {},
  loggerOptions: {
    als: true,
    pretty: false,
  },
  showExtraBootStats: false,
});
