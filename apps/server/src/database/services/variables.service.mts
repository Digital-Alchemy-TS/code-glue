import { TServiceParams } from "@digital-alchemy/core";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { MySql2Database } from "drizzle-orm/mysql2";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import { v4 } from "uuid";

import {
  SharedVariableCreateOptions,
  SharedVariableRow,
  SharedVariables,
} from "../../utils/index.mts";
import {
  mysqlSharedVariablesTable,
  postgresSharedVariablesTable,
  sqliteSharedVariablesTable,
} from "../schemas/index.mts";

export function VariablesTable({
  lifecycle,
  config,
  logger,
  synapse,
  context,
  metrics,
}: TServiceParams) {
  const store = new Map<string, SharedVariables>();

  lifecycle.onBootstrap(function () {
    loadFromDB();
  });

  // Database-specific implementations
  const sqlite = {
    async create(data: SharedVariableCreateOptions) {
      const database = synapse.database.getDatabase() as ReturnType<
        typeof drizzle
      >;
      const id = (data as any).id || v4();
      const row = { id, ...sqlite.save(data) };
      await database.insert(sqliteSharedVariablesTable).values(row);
      const out = sqlite.load(row);
      store.set(row.id, out);
      return out;
    },

    load(row: Partial<SharedVariableRow>): SharedVariables {
      return {
        ...row,
        labels: row.labels?.split("|") || [],
      } as SharedVariables;
    },

    async loadFromDB() {
      const database = synapse.database.getDatabase() as ReturnType<
        typeof drizzle
      >;
      store.clear();
      metrics.measure([context, "loadFromDB"], function () {
        const rows = database.select().from(sqliteSharedVariablesTable).all();
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
        .delete(sqliteSharedVariablesTable)
        .where(eq(sqliteSharedVariablesTable.id, id)).run();
    },

    save(data: SharedVariableCreateOptions) {
      const now = new Date().toISOString();
      return {
        create_date: (data as SharedVariables).createDate ?? now,
        documentation: data.documentation,
        id: (data as SharedVariables).id || "",
        labels: data.labels.join("|"),
        last_update: now,
        title: data.title,
        type: data.type,
        value: data.value,
      };
    },

    async update(id: string, data: Partial<SharedVariableCreateOptions>) {
      const database = synapse.database.getDatabase() as ReturnType<
        typeof drizzle
      >;
      const current = store.get(id);
      
      if (!current) {
        // If variable doesn't exist, create it with the provided ID
        const row = { id, ...sqlite.save(data as SharedVariableCreateOptions) };
        await database.insert(sqliteSharedVariablesTable).values(row);
        const out = sqlite.load(row);
        store.set(id, out);
        return out;
      }
      
      // Otherwise update existing variable
      const update = sqlite.save({ ...current, ...data });
      await database
        .update(sqliteSharedVariablesTable)
        .set(update)
        .where(eq(sqliteSharedVariablesTable.id, id));
      const out = sqlite.load(update);
      store.set(id, out);
      return out;
    },
  };

  const mysql = {
    async create(data: SharedVariableCreateOptions) {
      const database = synapse.database.getDatabase() as MySql2Database<
        Record<string, unknown>
      >;
      const id = (data as any).id || v4();
      const row = { id, ...mysql.save(data) };
      await database.insert(mysqlSharedVariablesTable).values(row);
      const out = mysql.load(row);
      store.set(row.id, out);
      return out;
    },

    load(row: Partial<SharedVariableRow>): SharedVariables {
      return {
        ...row,
        labels: row.labels?.split("|") || [],
      } as SharedVariables;
    },

    async loadFromDB() {
      const database = synapse.database.getDatabase() as MySql2Database<
        Record<string, unknown>
      >;
      store.clear();
      metrics.measure([context, "loadFromDB"], async function () {
        const rows = await database
          .select()
          .from(mysqlSharedVariablesTable)
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
        .delete(mysqlSharedVariablesTable)
        .where(eq(mysqlSharedVariablesTable.id, id));
    },

    save(data: SharedVariableCreateOptions) {
      const now = new Date();
      return {
        create_date: (data as SharedVariables).createDate
          ? new Date((data as SharedVariables).createDate)
          : now,
        documentation: data.documentation,
        id: (data as SharedVariables).id || "",
        labels: data.labels.join("|"),
        last_update: now,
        title: data.title,
        type: data.type,
        value: data.value,
      };
    },

    async update(id: string, data: Partial<SharedVariableCreateOptions>) {
      const database = synapse.database.getDatabase() as MySql2Database<
        Record<string, unknown>
      >;
      const current = store.get(id);
      
      if (!current) {
        // If variable doesn't exist, create it with the provided ID
        const row = { id, ...mysql.save(data as SharedVariableCreateOptions) };
        await database.insert(mysqlSharedVariablesTable).values(row);
        const out = mysql.load(row);
        store.set(id, out);
        return out;
      }
      
      // Otherwise update existing variable
      const update = mysql.save({ ...current, ...data });
      await database
        .update(mysqlSharedVariablesTable)
        .set(update)
        .where(eq(mysqlSharedVariablesTable.id, id));
      const out = mysql.load(update);
      store.set(id, out);
      return out;
    },
  };

  const postgres = {
    async create(data: SharedVariableCreateOptions) {
      const database = synapse.database.getDatabase() as ReturnType<
        typeof drizzlePostgres
      >;
      const id = (data as any).id || v4();
      const row = { id, ...postgres.save(data) };
      await database.insert(postgresSharedVariablesTable).values(row);
      const out = postgres.load(row);
      store.set(row.id, out);
      return out;
    },

    load(row: Partial<SharedVariableRow>): SharedVariables {
      return {
        ...row,
        labels: row.labels?.split("|") || [],
      } as SharedVariables;
    },

    async loadFromDB() {
      const database = synapse.database.getDatabase() as ReturnType<
        typeof drizzlePostgres
      >;
      store.clear();
      metrics.measure([context, "loadFromDB"], async function () {
        const rows = await database
          .select()
          .from(postgresSharedVariablesTable)
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
        .delete(postgresSharedVariablesTable)
        .where(eq(postgresSharedVariablesTable.id, id));
    },

    save(data: SharedVariableCreateOptions) {
      const now = new Date();
      return {
        create_date: (data as SharedVariables).createDate
          ? new Date((data as SharedVariables).createDate)
          : now,
        documentation: data.documentation,
        id: (data as SharedVariables).id || "",
        labels: data.labels.join("|"),
        last_update: now,
        title: data.title,
        type: data.type,
        value: data.value,
      };
    },

    async update(id: string, data: Partial<SharedVariableCreateOptions>) {
      const database = synapse.database.getDatabase() as ReturnType<
        typeof drizzlePostgres
      >;
      const current = store.get(id);
      
      if (!current) {
        // If variable doesn't exist, create it with the provided ID
        const row = { id, ...postgres.save(data as SharedVariableCreateOptions) };
        await database.insert(postgresSharedVariablesTable).values(row);
        const out = postgres.load(row);
        store.set(id, out);
        return out;
      }
      
      // Otherwise update existing variable
      const update = postgres.save({ ...current, ...data });
      await database
        .update(postgresSharedVariablesTable)
        .set(update)
        .where(eq(postgresSharedVariablesTable.id, id));
      const out = postgres.load(update);
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
  async function create(data: SharedVariableCreateOptions) {
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
  async function update(
    id: string,
    data: Partial<SharedVariableCreateOptions>,
  ) {
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
  function get(id: string): SharedVariables | undefined {
    return store.get(id);
  }

  // #MARK: list
  function list(): SharedVariables[] {
    return [...store.values()];
  }

  return { create, get, list, loadFromDB, remove, update };
}
