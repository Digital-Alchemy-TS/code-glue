import { TServiceParams } from "@digital-alchemy/core";
import Database from "bun:sqlite";

export function Internals({
  config,
  lifecycle,
  logger,
  synapse,
}: TServiceParams) {
  synapse.sqlite.setDriver(Database);
  let db: Database;
  lifecycle.onBootstrap(() => {
    db = synapse.sqlite.getDatabase();
  });
}
