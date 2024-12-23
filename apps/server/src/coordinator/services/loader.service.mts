import { TServiceParams } from "@digital-alchemy/core";

import { AUTOMATION_UPDATED } from "../../utils/index.mts";

export function LoaderService({
  event,
  lifecycle,
  database,
  coordinator,
}: TServiceParams) {
  function reload() {
    const list = database.automation.list();
    list.forEach(i => {
      coordinator.execute(i);
    });
  }

  lifecycle.onReady(() => reload());
  event.on(AUTOMATION_UPDATED, () => reload());
}
