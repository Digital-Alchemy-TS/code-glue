import { TServiceParams } from "@digital-alchemy/core";
import { Database } from "better-sqlite3";
import { v4 } from "uuid";

import {
  SynapseEntities,
  SynapseEntityCreateOptions,
  SynapseEntityRow,
} from "../../utils";

const CREATE = `CREATE TABLE IF NOT EXISTS SynapseEntities (
  createDate DATETIME NOT NULL,
  documentation TEXT NOT NULL,
  id TEXT PRIMARY KEY NOT NULL,
  labels TEXT NOT NULL,
  lastUpdate DATETIME NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  attributes TEXT NOT NULL,
  defaultConfig TEXT NOT NULL,
  icon TEXT NOT NULL,
  local TEXT NOT NULL,
  suggested_object_id TEXT NOT NULL
)`;
const UPSERT = `INSERT INTO SynapseEntities (
  createDate, documentation, id, labels, lastUpdate, name, type, attributes, defaultConfig, icon, local, suggested_object_id
) VALUES (
  @createDate, @documentation, @id, @labels, @lastUpdate, @name, @type, @attributes, @defaultConfig, @icon, @local, @suggested_object_id
) ON CONFLICT(id) DO UPDATE SET
  documentation = excluded.documentation,
  labels = excluded.labels,
  lastUpdate = excluded.lastUpdate,
  name = excluded.name,
  type = excluded.type,
  attributes = excluded.attributes,
  defaultConfig = excluded.defaultConfig,
  icon = excluded.icon,
  local = excluded.local,
  suggested_object_id = excluded.suggested_object_id`;

const REMOVE = `DELETE FROM SynapseEntities WHERE id = $id`;
const SELECT_ALL = `SELECT * FROM SynapseEntities`;

export function SynapseEntitiesTable({
  lifecycle,
  logger,
  synapse,
  context,
  metrics,
}: TServiceParams) {
  let database: Database;
  let store = new Map<string, SynapseEntities>();

  lifecycle.onBootstrap(() => {
    database = synapse.sqlite.getDatabase();
    database.prepare(CREATE).run();
    loadFromDB();
  });

  // #MARK: load
  function load(row: Partial<SynapseEntityRow>): SynapseEntities {
    return {
      ...row,
      labels: row.labels.split("|"),
    } as SynapseEntities;
  }

  // #MARK: save
  function save(data: SynapseEntities | SynapseEntityCreateOptions) {
    const now = new Date().toISOString();
    return {
      ...data,
      createDate: (data as SynapseEntities).createDate ?? now,
      labels: data.labels.join("|"),
      lastUpdate: now,
    };
  }

  // #MARK: loadFromDB
  function loadFromDB() {
    store = new Map();
    metrics.measure([context, loadFromDB], () => {
      database
        .prepare<[], SynapseEntityRow>(SELECT_ALL)
        .all()
        .forEach(row => store.set(row.id, load(row)));
    });
    logger.debug({ count: store.size }, `loaded automations`);
  }

  // #MARK: create
  function create(data: SynapseEntityCreateOptions) {
    const id = v4();
    const row = { ...save(data), id };
    database.prepare(UPSERT).run(row);
    store.set(id, load(row));
  }

  // #MARK: update
  function update(id: string, data: Partial<SynapseEntityCreateOptions>) {
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
  function get(id: string): SynapseEntities {
    return store.get(id);
  }

  // #MARK: list
  function list(): SynapseEntities[] {
    return [...store.values()];
  }

  return { create, get, list, loadFromDB, remove, update };
}
