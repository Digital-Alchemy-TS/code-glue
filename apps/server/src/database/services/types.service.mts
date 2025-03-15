import { TServiceParams } from "@digital-alchemy/core";
import { Database } from "better-sqlite3";

export interface HeaderImportStatement {
  /**
   * ex: "@digital-alchemy/hass"
   */
  package: string;
  /**
   * ex: "{ LIB_HASS, PICK_ENTITY }"
   * ex: "dayjs"
   */
  statement: string;
  /**
   * Property to extract from TServiceParams.
   * Only relevant for DA based libraries
   */
  lib_name?: string;
  /**
   *
   */
  init?: string;
}

const CREATE = `CREATE TABLE IF NOT EXISTS ImportTypes (
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

const UPSERT = `INSERT INTO ImportTypes (
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

const REMOVE = `DELETE FROM ImportTypes WHERE id = $id`;
const SELECT_ALL = `SELECT * FROM ImportTypes`;

export function TypesTable({
  lifecycle,
  logger,
  synapse,
  context,
  metrics,
}: TServiceParams) {
  // let database: Database;

  lifecycle.onBootstrap(() => {
    // database = synapse.sqlite.getDatabase();
    // database.prepare(CREATE).run();
  });
}
