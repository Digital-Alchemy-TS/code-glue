import { TServiceParams } from "@digital-alchemy/core";
import { Database } from "better-sqlite3";
import { v4 } from "uuid";

import {
  AutomationCreateOptions,
  StoredAutomation,
  StoredAutomationRow,
} from "../../utils/index.mts";

const CREATE = `CREATE TABLE IF NOT EXISTS StoredAutomation (
  active TEXT NOT NULL,
  area TEXT,
  body TEXT NOT NULL,
  context TEXT NOT NULL,
  createDate DATETIME NOT NULL,
  id TEXT PRIMARY KEY NOT NULL,
  labels TEXT NOT NULL,
  lastUpdate DATETIME NOT NULL,
  parent TEXT,
  title TEXT NOT NULL,
  documentation TEXT NOT NULL,
  version TEXT NOT NULL
)`;

const UPSERT = `INSERT INTO StoredAutomation (
  active, area, body, context, labels, parent, title, version, documentation, id, createDate, lastUpdate
) VALUES (
  @active, @area, @body, @context, @labels, @parent, @title, @version, @documentation, @id,
  datetime('now'), datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  active = excluded.active,
  area = excluded.area,
  body = excluded.body,
  context = excluded.context,
  labels = excluded.labels,
  documentation = excluded.documentation,
  parent = excluded.parent,
  title = excluded.title,
  version = excluded.version,
  lastUpdate = datetime('now')`;

const REMOVE = `DELETE FROM StoredAutomation WHERE id = $id`;
const SELECT_ALL = `SELECT * FROM StoredAutomation`;

export function AutomationTable({
  lifecycle,
  logger,
  synapse,
  context,
  metrics,
}: TServiceParams) {
  let database: Database;
  let store = new Map<string, StoredAutomation>();

  lifecycle.onBootstrap(() => {
    database = synapse.sqlite.getDatabase();
    database.prepare(CREATE).run();
    loadFromDB();
  });

  // #MARK: load
  function load(row: Partial<StoredAutomationRow>): StoredAutomation {
    return {
      ...row,
      active: row.active === "true",
      labels: row.labels.split("|"),
    } as StoredAutomation;
  }

  // #MARK: save
  function save(data: StoredAutomation) {
    const now = new Date().toISOString();
    return {
      ...data,
      active: data.active ? "true" : "false",
      createDate: data.createDate ?? now,
      labels: data.labels.join("|"),
      lastUpdate: now,
    };
  }

  // #MARK: loadFromDB
  function loadFromDB() {
    store = new Map();
    metrics.measure([context, loadFromDB], () => {
      database
        .prepare<[], StoredAutomationRow>(SELECT_ALL)
        .all()
        .forEach(row => store.set(row.id, load(row)));
    });
    logger.debug({ count: store.size }, `loaded automations`);
  }

  // #MARK: create
  function create(data: AutomationCreateOptions) {
    const id = v4();
    const now = new Date().toISOString();
    const row: StoredAutomationRow = {
      id,
      ...data,
      active: data.active ? "true" : "false",
      createDate: now,
      labels: data.labels.join("|"),
      lastUpdate: now,
    };
    database.prepare(UPSERT).run({ ...row });
    store.set(row.id, load(row));
  }

  // #MARK: update
  function update(id: string, data: Partial<AutomationCreateOptions>) {
    const current = store.get(id);
    const update = save({ ...current, ...data });
    database.prepare(UPSERT).run({ ...update, id });
    const out = load(update);
    store.set(id, out);

    //
    return out;
  }

  // #MARK: remove
  function remove(id: string): void {
    store.delete(id);
    database.prepare(REMOVE).run({ id });
  }

  // #MARK: get
  function get(id: string): StoredAutomation {
    return store.get(id);
  }

  // #MARK: list
  function list(): StoredAutomation[] {
    return [...store.values()];
  }

  return { create, get, list, loadFromDB, remove, update };
}
