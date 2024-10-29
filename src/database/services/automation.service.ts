import { TServiceParams } from "@digital-alchemy/core";
import Database from "bun:sqlite";
import { v4 } from "uuid";

import { StoredAutomation } from "../../utils";

const CREATE = `CREATE TABLE StoredAutomation (
  active BOOLEAN NOT NULL,
  area TEXT,
  body TEXT NOT NULL,
  context TEXT NOT NULL,
  createDate DATETIME NOT NULL,
  id TEXT PRIMARY KEY NOT NULL,
  labels TEXT NOT NULL,
  lastUpdate DATETIME NOT NULL,
  parent TEXT,
  title TEXT NOT NULL,
  version TEXT NOT NULL
)`;

const UPSERT = `INSERT INTO StoredAutomation (
  active, area, body, context, labels, parent, title, version, createDate, lastUpdate, id
) VALUES (
  @active, @area, @body, @context, @labels, @parent, @title, @version,
  datetime('now'), datetime('now'), @id
) ON CONFLICT(id) DO UPDATE SET
  active = excluded.active,
  area = excluded.area,
  body = excluded.body,
  context = excluded.context,
  labels = excluded.labels,
  parent = excluded.parent,
  title = excluded.title,
  version = excluded.version,
  lastUpdate = datetime('now')`;

export type AutomationCreateOptions = Omit<
  StoredAutomation,
  "id" | "lastUpdate" | "createDate"
>;
const REMOVE = `DELETE FROM StoredAutomation WHERE id = $id`;

export function AutomationTable({
  lifecycle,
  logger,
  synapse,
}: TServiceParams) {
  let database: Database;
  const store = new Map<string, StoredAutomation>();
  lifecycle.onBootstrap(() => {
    database = synapse.sqlite.getDatabase();
    database.prepare(CREATE).run();
  });

  function create(data: AutomationCreateOptions) {
    const id = v4();
    store.set(id, {
      ...data,
      createDate: new Date(),
      id,
      lastUpdate: new Date(),
    });
  }

  function update(id: string, data: Partial<AutomationCreateOptions>) {
    const current = store.get(id);
    store.set(id, {
      ...current,
      ...data,
    });
  }

  function remove(id: string): void {
    store.delete(id);
    database.prepare(REMOVE).run({ id });
  }

  function get(id: string): StoredAutomation {
    return store.get(id);
  }

  function list(): StoredAutomation[] {
    return [...store.values()];
  }

  return { create, get, list, remove, update };
}
