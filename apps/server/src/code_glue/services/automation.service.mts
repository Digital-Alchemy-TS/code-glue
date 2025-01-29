import { TServiceParams } from "@digital-alchemy/core";

import { AutomationCreateOptions } from "../../utils/index.mts";

export function AutomationLogic({
  logger,
  database: { automation },
  coordinator,
}: TServiceParams) {
  function reload(id: string, body: AutomationCreateOptions) {
    const out = automation.update(id, body);
    coordinator.loader.reload(id);
    return out;
  }

  return { reload };
}
