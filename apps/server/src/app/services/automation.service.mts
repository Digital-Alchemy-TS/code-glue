import { TServiceParams } from "@digital-alchemy/core";

import { AutomationCreateOptions } from "../../utils/index.mts";

export function AutomationLogic({
  logger,
  database: { automation },
  coordinator,
  config,
  lifecycle,
}: TServiceParams) {
  
  // Debug configuration after it's loaded
  lifecycle.onPostConfig(() => {
    console.log("=== DIGITAL ALCHEMY CONFIG ===");
    console.log("hass config:", JSON.stringify(config.hass, null, 2));
    console.log("boilerplate config:", JSON.stringify(config.boilerplate, null, 2));
    console.log("==============================");
  });
  function reload(id: string, body: AutomationCreateOptions) {
    const out = automation.update(id, body);
    coordinator.loader.reload(id);
    return out;
  }

  return { reload };
}
