import { CODE_GLUE_APP } from "../../app.module.mts";

// Debug logging for environment and configuration
console.log("=== ENVIRONMENT VARIABLES ===");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("HASS_BASE_URL:", process.env.HASS_BASE_URL);
console.log("HASS_TOKEN:", process.env.HASS_TOKEN ? "[SET]" : "[NOT SET]");
console.log("SUPERVISOR_TOKEN:", process.env.SUPERVISOR_TOKEN ? "[SET]" : "[NOT SET]");
console.log("All env vars with HASS:", Object.keys(process.env).filter(key => key.includes('HASS')));
console.log("All env vars with SUPERVISOR:", Object.keys(process.env).filter(key => key.includes('SUPERVISOR')));
console.log("==============================");

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
