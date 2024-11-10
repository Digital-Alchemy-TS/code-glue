import { TServiceParams } from "@digital-alchemy/core";
import { Database } from "better-sqlite3";
import { v4 } from "uuid";

import {
  SharedVariableCreateOptions,
  SharedVariableRow,
  SharedVariables,
} from "../../utils/contracts/variables";

const CREATE = `CREATE TABLE IF NOT EXISTS SharedVariables (
  createDate DATETIME NOT NULL,
  documentation TEXT NOT NULL,
  id TEXT PRIMARY KEY NOT NULL,
  labels TEXT NOT NULL,
  lastUpdate DATETIME NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  value TEXT NOT NULL
)`;

const UPSERT = `INSERT INTO SharedVariables (
  createDate, documentation, id, labels, lastUpdate, title, type, value
) VALUES (
  @createDate, @documentation, @id, @labels, @lastUpdate, @title, @type, @value
) ON CONFLICT(id) DO UPDATE SET
  documentation = excluded.documentation,
  labels = excluded.labels,
  lastUpdate = excluded.lastUpdate,
  title = excluded.title,
  type = excluded.type,
  value = excluded.value`;

const REMOVE = `DELETE FROM SharedVariables WHERE id = $id`;

const SELECT_ALL = `SELECT * FROM SharedVariables`;

export function VariablesTable({
  lifecycle,
  logger,
  synapse,
  context,
  metrics,
}: TServiceParams) {
  let database: Database;
  let store = new Map<string, SharedVariables>();

  lifecycle.onBootstrap(() => {
    database = synapse.sqlite.getDatabase();
    database.prepare(CREATE).run();
    loadFromDB();
  });

  // #MARK: load
  function load(row: Partial<SharedVariableRow>): SharedVariables {
    return {
      ...row,
      labels: row.labels.split("|"),
    } as SharedVariables;
  }

  // #MARK: save
  function save(data: SharedVariables | SharedVariableCreateOptions) {
    const now = new Date().toISOString();
    return {
      ...data,
      createDate: (data as SharedVariables).createDate ?? now,
      labels: data.labels.join("|"),
      lastUpdate: now,
    };
  }

  // #MARK: loadFromDB
  function loadFromDB() {
    store = new Map();
    metrics.measure([context, loadFromDB], () => {
      database
        .prepare<[], SharedVariableRow>(SELECT_ALL)
        .all()
        .forEach(row => store.set(row.id, load(row)));
    });
    logger.debug({ count: store.size }, `loaded automations`);
  }

  // #MARK: create
  function create(data: SharedVariableCreateOptions) {
    const id = v4();
    const row = { id, ...save(data) };
    database.prepare(UPSERT).run(row);
    store.set(row.id, load(row));
  }

  // #MARK: update
  function update(id: string, data: Partial<SharedVariableCreateOptions>) {
    const current = store.get(id);
    const update = save({ ...current, ...data });
    database.prepare(UPSERT).run({ ...update, id });
    const out = load(update);
    store.set(id, out);
    return out;
  }

  // #MARK: remove
  function remove(id: string): void {
    store.delete(id);
    database.prepare(REMOVE).run({ id });
  }

  // #MARK: get
  function get(id: string): SharedVariables {
    return store.get(id);
  }

  // #MARK: list
  function list(): SharedVariables[] {
    return [...store.values()];
  }

  return { create, get, list, loadFromDB, remove, update };
}
