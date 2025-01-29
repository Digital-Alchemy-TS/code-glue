import { TServiceParams } from "@digital-alchemy/core";

export function LoaderService({
  lifecycle,
  database,
  coordinator,
  logger,
}: TServiceParams) {
  function loadAll() {
    const list = database.automation.list();
    list.forEach(i => {
      coordinator.execute(i);
    });
  }

  lifecycle.onReady(() => loadAll());

  function reload(id: string) {
    const remover = coordinator.teardown.byId(id);
    remover?.teardown();
    const item = database.automation.get(id);
    coordinator.execute(item);
  }

  return {
    reload,
  };
}
