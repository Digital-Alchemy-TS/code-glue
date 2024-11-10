import { is, TServiceParams } from "@digital-alchemy/core";
import { Database } from "better-sqlite3";
import { v4 } from "uuid";

import {
  SYNAPSE_ENTITIES_ADDED,
  SYNAPSE_ENTITIES_REMOVED,
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
  locals TEXT NOT NULL,
  suggested_object_id TEXT NOT NULL,
  defaultAttributes TEXT NOT NULL,
  defaultLocals TEXT NOT NULL
)`;
const UPSERT = `INSERT INTO SynapseEntities (
  createDate, documentation, id, labels, lastUpdate, name, type, attributes, defaultConfig, icon, locals, suggested_object_id, defaultAttributes, defaultLocals
) VALUES (
  @createDate, @documentation, @id, @labels, @lastUpdate, @name, @type, @attributes, @defaultConfig, @icon, @locals, @suggested_object_id, @defaultAttributes, @defaultLocals
) ON CONFLICT(id) DO UPDATE SET
  documentation = excluded.documentation,
  labels = excluded.labels,
  lastUpdate = excluded.lastUpdate,
  name = excluded.name,
  type = excluded.type,
  attributes = excluded.attributes,
  defaultConfig = excluded.defaultConfig,
  icon = excluded.icon,
  locals = excluded.locals,
  suggested_object_id = excluded.suggested_object_id,
  defaultAttributes = excluded.defaultAttributes,
  defaultLocals = excluded.defaultLocals`;

const REMOVE = `DELETE FROM SynapseEntities WHERE id = $id`;
const SELECT_ALL = `SELECT * FROM SynapseEntities`;

export function SynapseEntitiesTable({
  lifecycle,
  logger,
  event,
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
      labels: is.empty(row.labels) ? [] : row.labels.split("|"),
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
    const row = { id, ...save(data) };
    database.prepare(UPSERT).run(row);
    const out = load(row);
    store.set(row.id, out);
    event.emit(SYNAPSE_ENTITIES_ADDED, out);
    return out;
  }

  // #MARK: update
  function update(id: string, data: Partial<SynapseEntityCreateOptions>) {
    const current = store.get(id);
    const update = save({ ...current, ...data });
    database.prepare(UPSERT).run({ ...update, id });
    const out = load(update);
    store.set(id, out);
    // does not emit anything
    // in order to affect the entity, a rebuild is needed
    return out;
  }

  // #MARK: remove
  function remove(id: string): void {
    store.delete(id);
    database.prepare(REMOVE).run({ id });
    event.emit(SYNAPSE_ENTITIES_REMOVED, id);
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
