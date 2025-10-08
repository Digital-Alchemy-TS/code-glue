import { TServiceParams } from "@digital-alchemy/core";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { MySql2Database } from "drizzle-orm/mysql2";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import { v4 } from "uuid";

import {
  ImportType,
  ImportTypeCreateOptions,
  ImportTypeRow,
} from "../schemas/common.mts";
import {
  mysqlImportTypesTable,
  postgresImportTypesTable,
  sqliteImportTypesTable,
} from "../schemas/index.mts";

// Database-specific row types
type SqliteImportTypeRow = Omit<
  ImportTypeRow,
  "create_date" | "last_update"
> & {
  create_date: string;
  last_update: string;
};

type MysqlImportTypeRow = Omit<ImportTypeRow, "create_date" | "last_update"> & {
  create_date: Date;
  last_update: Date;
};

type PostgresImportTypeRow = Omit<
  ImportTypeRow,
  "create_date" | "last_update"
> & {
  create_date: Date;
  last_update: Date;
};

export function TypesTable({
  lifecycle,
  config,
  logger,
  synapse,
  context,
  metrics,
}: TServiceParams) {
  const store = new Map<string, ImportType>();

  lifecycle.onBootstrap(function () {
    loadFromDB();
  });

  // Database-specific implementations
  const sqlite = {
    async create(data: ImportTypeCreateOptions) {
      const database = synapse.database.getDatabase() as ReturnType<
        typeof drizzle
      >;
      const id = v4();
      const row = { id, ...sqlite.save(data) };
      await database.insert(sqliteImportTypesTable).values(row).run();
      const out = sqlite.load(row);
      store.set(row.id, out);
      return out;
    },

    load(row: Partial<SqliteImportTypeRow>): ImportType {
      return {
        ...row,
        labels: row.labels?.split("|") || [],
      } as ImportType;
    },

    async loadFromDB() {
      const database = synapse.database.getDatabase() as ReturnType<
        typeof drizzle
      >;
      store.clear();
      metrics.measure([context, "loadFromDB"], function () {
        const rows = database.select().from(sqliteImportTypesTable).all();
        rows.forEach(function (row) {
          const loaded = sqlite.load(row);
          store.set(loaded.id, loaded);
        });
      });
    },

    async remove(id: string) {
      const database = synapse.database.getDatabase() as ReturnType<
        typeof drizzle
      >;
      store.delete(id);
      await database
        .delete(sqliteImportTypesTable)
        .where(eq(sqliteImportTypesTable.id, id)).run();
    },

    save(data: ImportTypeCreateOptions): Omit<SqliteImportTypeRow, "id"> {
      const now = new Date().toISOString();
      return {
        active: data.active,
        area: data.area,
        body: data.body,
        context: data.context,
        create_date: (data as ImportType).create_date ?? now,
        documentation: data.documentation,
        labels: data.labels.join("|"),
        last_update: now,
        parent: data.parent,
        title: data.title,
        version: data.version,
      };
    },

    async update(id: string, data: Partial<ImportTypeCreateOptions>) {
      const database = synapse.database.getDatabase() as ReturnType<
        typeof drizzle
      >;
      const current = store.get(id);
      const update = sqlite.save({ ...current, ...data });
      await database
        .update(sqliteImportTypesTable)
        .set(update)
        .where(eq(sqliteImportTypesTable.id, id)).run();
      const out = sqlite.load({ id, ...update });
      store.set(id, out);
      return out;
    },
  };

  const mysql = {
    async create(data: ImportTypeCreateOptions) {
      const database = synapse.database.getDatabase() as MySql2Database<
        Record<string, unknown>
      >;
      const id = v4();
      const row = { id, ...mysql.save(data) };
      await database.insert(mysqlImportTypesTable).values(row);
      const out = mysql.load(row);
      store.set(row.id, out);
      return out;
    },

    load(row: Partial<MysqlImportTypeRow>): ImportType {
      return {
        ...row,
        create_date: row.create_date?.toISOString() || new Date().toISOString(),
        labels: row.labels?.split("|") || [],
        last_update: row.last_update?.toISOString() || new Date().toISOString(),
      } as ImportType;
    },

    async loadFromDB() {
      const database = synapse.database.getDatabase() as MySql2Database<
        Record<string, unknown>
      >;
      store.clear();
      metrics.measure([context, "loadFromDB"], async function () {
        const rows = await database
          .select()
          .from(mysqlImportTypesTable)
          .execute();
        rows.forEach(function (row) {
          const loaded = mysql.load(row);
          store.set(loaded.id, loaded);
        });
      });
    },

    async remove(id: string) {
      const database = synapse.database.getDatabase() as MySql2Database<
        Record<string, unknown>
      >;
      store.delete(id);
      await database
        .delete(mysqlImportTypesTable)
        .where(eq(mysqlImportTypesTable.id, id));
    },

    save(data: ImportTypeCreateOptions): Omit<MysqlImportTypeRow, "id"> {
      const now = new Date();
      return {
        active: data.active,
        area: data.area,
        body: data.body,
        context: data.context,
        create_date: (data as ImportType).create_date
          ? new Date((data as ImportType).create_date)
          : now,
        documentation: data.documentation,
        labels: data.labels.join("|"),
        last_update: now,
        parent: data.parent,
        title: data.title,
        version: data.version,
      };
    },

    async update(id: string, data: Partial<ImportTypeCreateOptions>) {
      const database = synapse.database.getDatabase() as MySql2Database<
        Record<string, unknown>
      >;
      const current = store.get(id);
      const update = mysql.save({ ...current, ...data });
      await database
        .update(mysqlImportTypesTable)
        .set(update)
        .where(eq(mysqlImportTypesTable.id, id));
      const out = mysql.load({ id, ...update });
      store.set(id, out);
      return out;
    },
  };

  const postgres = {
    async create(data: ImportTypeCreateOptions) {
      const database = synapse.database.getDatabase() as ReturnType<
        typeof drizzlePostgres
      >;
      const id = v4();
      const row = { id, ...postgres.save(data) };
      await database.insert(postgresImportTypesTable).values(row);
      const out = postgres.load(row);
      store.set(row.id, out);
      return out;
    },

    load(row: Partial<PostgresImportTypeRow>): ImportType {
      return {
        ...row,
        create_date: row.create_date?.toISOString() || new Date().toISOString(),
        labels: row.labels?.split("|") || [],
        last_update: row.last_update?.toISOString() || new Date().toISOString(),
      } as ImportType;
    },

    async loadFromDB() {
      const database = synapse.database.getDatabase() as ReturnType<
        typeof drizzlePostgres
      >;
      store.clear();
      metrics.measure([context, "loadFromDB"], async function () {
        const rows = await database
          .select()
          .from(postgresImportTypesTable)
          .execute();
        rows.forEach(function (row) {
          const loaded = postgres.load(row);
          store.set(loaded.id, loaded);
        });
      });
    },

    async remove(id: string) {
      const database = synapse.database.getDatabase() as ReturnType<
        typeof drizzlePostgres
      >;
      store.delete(id);
      await database
        .delete(postgresImportTypesTable)
        .where(eq(postgresImportTypesTable.id, id));
    },

    save(data: ImportTypeCreateOptions): Omit<PostgresImportTypeRow, "id"> {
      const now = new Date();
      return {
        active: data.active,
        area: data.area,
        body: data.body,
        context: data.context,
        create_date: (data as ImportType).create_date
          ? new Date((data as ImportType).create_date)
          : now,
        documentation: data.documentation,
        labels: data.labels.join("|"),
        last_update: now,
        parent: data.parent,
        title: data.title,
        version: data.version,
      };
    },

    async update(id: string, data: Partial<ImportTypeCreateOptions>) {
      const database = synapse.database.getDatabase() as ReturnType<
        typeof drizzlePostgres
      >;
      const current = store.get(id);
      const update = postgres.save({ ...current, ...data });
      await database
        .update(postgresImportTypesTable)
        .set(update)
        .where(eq(postgresImportTypesTable.id, id));
      const out = postgres.load({ id, ...update });
      store.set(id, out);
      return out;
    },
  };

  // #MARK: loadFromDB
  async function loadFromDB() {
    const dbType = config.synapse.DATABASE_TYPE;
    switch (dbType) {
      case "mysql":
        await mysql.loadFromDB();
        break;
      case "postgresql":
        await postgres.loadFromDB();
        break;
      case "sqlite":
      default:
        await sqlite.loadFromDB();
        break;
    }
  }

  // #MARK: create
  async function create(data: ImportTypeCreateOptions) {
    const dbType = config.synapse.DATABASE_TYPE;
    switch (dbType) {
      case "mysql":
        return await mysql.create(data);
      case "postgresql":
        return await postgres.create(data);
      case "sqlite":
      default:
        return await sqlite.create(data);
    }
  }

  // #MARK: update
  async function update(id: string, data: Partial<ImportTypeCreateOptions>) {
    const dbType = config.synapse.DATABASE_TYPE;
    switch (dbType) {
      case "mysql":
        return await mysql.update(id, data);
      case "postgresql":
        return await postgres.update(id, data);
      case "sqlite":
      default:
        return await sqlite.update(id, data);
    }
  }

  // #MARK: remove
  async function remove(id: string): Promise<void> {
    const dbType = config.synapse.DATABASE_TYPE;
    switch (dbType) {
      case "mysql":
        await mysql.remove(id);
        break;
      case "postgresql":
        await postgres.remove(id);
        break;
      case "sqlite":
      default:
        await sqlite.remove(id);
        break;
    }
  }

  // #MARK: get
  function get(id: string): ImportType | undefined {
    return store.get(id);
  }

  // #MARK: list
  function list(): ImportType[] {
    return [...store.values()];
  }

  return { create, get, list, loadFromDB, remove, update };
}
