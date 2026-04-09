import type { TServiceParams } from "@digital-alchemy/core";
import { eq } from "drizzle-orm";
import type { drizzle } from "drizzle-orm/better-sqlite3";
import type { MySql2Database } from "drizzle-orm/mysql2";
import type { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import { v4 } from "uuid";

import type {
  AutomationCreateOptions,
  StoredAutomation,
  StoredAutomationRow,
} from "../../utils/index.mts";
import {
  mysqlStoredAutomationTable,
  postgresStoredAutomationTable,
  sqliteStoredAutomationTable,
} from "../schemas/index.mts";

export function AutomationTable({
  lifecycle,
  config,
  logger,
  synapse,
  context,
  metrics,
}: TServiceParams) {
  const store = new Map<string, StoredAutomation>();

  lifecycle.onBootstrap(() => {
    loadFromDB();
  });

  // Database-specific implementations
  const sqlite = {
    async create(data: AutomationCreateOptions) {
      const database = synapse.database.getDatabase() as ReturnType<typeof drizzle>;
      const id = v4();
      const row = { ...sqlite.save(data), id };
      await database.insert(sqliteStoredAutomationTable).values(row);
      const out = sqlite.load(row);
      store.set(row.id, out);
      return out;
    },

    load(
      row: Partial<StoredAutomationRow> & { active_version_id?: string | null },
    ): StoredAutomation {
      return {
        ...row,
        active: row.active === "true",
        activeVersionId: row.active_version_id ?? undefined,
        labels: row.labels?.split("|") || [],
      } as StoredAutomation;
    },

    async loadFromDB() {
      const database = synapse.database.getDatabase() as ReturnType<typeof drizzle>;
      store.clear();
      metrics.measure([context, "loadFromDB"], () => {
        const rows = database.select().from(sqliteStoredAutomationTable).all();
        rows.forEach(row => {
          const loaded = sqlite.load(row);
          store.set(loaded.id, loaded);
        });
      });
    },

    async remove(id: string) {
      const database = synapse.database.getDatabase() as ReturnType<typeof drizzle>;
      store.delete(id);
      await database
        .delete(sqliteStoredAutomationTable)
        .where(eq(sqliteStoredAutomationTable.id, id));
    },

    save(data: AutomationCreateOptions) {
      const now = new Date().toISOString();
      return {
        active: data.active ? "true" : "false",
        active_version_id: data.activeVersionId ?? null,
        area: data.area,
        body: data.body,
        context: data.context,
        create_date: (data as StoredAutomation).createDate ?? now,
        documentation: data.documentation,
        icon: data.icon,
        id: (data as StoredAutomation).id || "",
        labels: data.labels.join("|"),
        last_update: now,
        parent: data.parent,
        title: data.title,
        version: (data as StoredAutomation & { version?: string }).version ?? "",
      };
    },

    async update(id: string, data: Partial<AutomationCreateOptions>) {
      const database = synapse.database.getDatabase() as ReturnType<typeof drizzle>;
      const current = store.get(id);

      if (!current) {
        // If automation doesn't exist, create it with the provided ID
        const row = { ...sqlite.save(data as AutomationCreateOptions), id };
        await database.insert(sqliteStoredAutomationTable).values(row);
        const out = sqlite.load(row);
        store.set(id, out);
        return out;
      }

      // Otherwise update existing automation
      const update = sqlite.save({ ...current, ...data });
      await database
        .update(sqliteStoredAutomationTable)
        .set(update)
        .where(eq(sqliteStoredAutomationTable.id, id));
      const out = sqlite.load(update);
      store.set(id, out);
      return out;
    },
  };

  const mysql = {
    async create(data: AutomationCreateOptions) {
      const database = synapse.database.getDatabase() as MySql2Database<Record<string, unknown>>;
      const id = v4();
      const row = { ...mysql.save(data), id };
      await database.insert(mysqlStoredAutomationTable).values(row);
      const out = mysql.load(row);
      store.set(row.id, out);
      return out;
    },

    load(
      row: Partial<StoredAutomationRow> & { active_version_id?: string | null },
    ): StoredAutomation {
      return {
        ...row,
        active: row.active === "true",
        activeVersionId: row.active_version_id ?? undefined,
        labels: row.labels?.split("|") || [],
      } as StoredAutomation;
    },

    async loadFromDB() {
      const database = synapse.database.getDatabase() as MySql2Database<Record<string, unknown>>;
      store.clear();
      metrics.measure([context, "loadFromDB"], async () => {
        const rows = await database.select().from(mysqlStoredAutomationTable).execute();
        rows.forEach(row => {
          const loaded = mysql.load(row);
          store.set(loaded.id, loaded);
        });
      });
    },

    async remove(id: string) {
      const database = synapse.database.getDatabase() as MySql2Database<Record<string, unknown>>;
      store.delete(id);
      await database
        .delete(mysqlStoredAutomationTable)
        .where(eq(mysqlStoredAutomationTable.id, id));
    },

    save(data: AutomationCreateOptions) {
      const now = new Date();
      return {
        active: data.active ? "true" : "false",
        active_version_id: data.activeVersionId ?? null,
        area: data.area,
        body: data.body,
        context: data.context,
        create_date: (data as StoredAutomation).createDate
          ? new Date((data as StoredAutomation).createDate)
          : now,
        documentation: data.documentation,
        icon: data.icon,
        id: (data as StoredAutomation).id || "",
        labels: data.labels.join("|"),
        last_update: now,
        parent: data.parent,
        title: data.title,
        version: (data as StoredAutomation & { version?: string }).version ?? "",
      };
    },

    async update(id: string, data: Partial<AutomationCreateOptions>) {
      const database = synapse.database.getDatabase() as MySql2Database<Record<string, unknown>>;
      const current = store.get(id);

      if (!current) {
        // If automation doesn't exist, create it with the provided ID
        const row = { ...mysql.save(data as AutomationCreateOptions), id };
        await database.insert(mysqlStoredAutomationTable).values(row);
        const out = mysql.load(row);
        store.set(id, out);
        return out;
      }

      // Otherwise update existing automation
      const update = mysql.save({ ...current, ...data });
      await database
        .update(mysqlStoredAutomationTable)
        .set(update)
        .where(eq(mysqlStoredAutomationTable.id, id));
      const out = mysql.load(update);
      store.set(id, out);
      return out;
    },
  };

  const postgres = {
    async create(data: AutomationCreateOptions) {
      const database = synapse.database.getDatabase() as ReturnType<typeof drizzlePostgres>;
      const id = v4();
      const row = { ...postgres.save(data), id };
      await database.insert(postgresStoredAutomationTable).values(row);
      const out = postgres.load(row);
      store.set(row.id, out);
      return out;
    },

    load(
      row: Partial<StoredAutomationRow> & { active_version_id?: string | null },
    ): StoredAutomation {
      return {
        ...row,
        active: row.active === "true",
        activeVersionId: row.active_version_id ?? undefined,
        labels: row.labels?.split("|") || [],
      } as StoredAutomation;
    },

    async loadFromDB() {
      const database = synapse.database.getDatabase() as ReturnType<typeof drizzlePostgres>;
      store.clear();
      metrics.measure([context, "loadFromDB"], async () => {
        const rows = await database.select().from(postgresStoredAutomationTable).execute();
        rows.forEach(row => {
          const loaded = postgres.load(row);
          store.set(loaded.id, loaded);
        });
      });
    },

    async remove(id: string) {
      const database = synapse.database.getDatabase() as ReturnType<typeof drizzlePostgres>;
      store.delete(id);
      await database
        .delete(postgresStoredAutomationTable)
        .where(eq(postgresStoredAutomationTable.id, id));
    },

    save(data: AutomationCreateOptions) {
      const now = new Date();
      return {
        active: data.active ? "true" : "false",
        active_version_id: data.activeVersionId ?? null,
        area: data.area,
        body: data.body,
        context: data.context,
        create_date: (data as StoredAutomation).createDate
          ? new Date((data as StoredAutomation).createDate)
          : now,
        documentation: data.documentation,
        icon: data.icon,
        id: (data as StoredAutomation).id || "",
        labels: data.labels.join("|"),
        last_update: now,
        parent: data.parent,
        title: data.title,
        version: (data as StoredAutomation & { version?: string }).version ?? "",
      };
    },

    async update(id: string, data: Partial<AutomationCreateOptions>) {
      const database = synapse.database.getDatabase() as ReturnType<typeof drizzlePostgres>;
      const current = store.get(id);

      if (!current) {
        // If automation doesn't exist, create it with the provided ID
        const row = { ...postgres.save(data as AutomationCreateOptions), id };
        await database.insert(postgresStoredAutomationTable).values(row);
        const out = postgres.load(row);
        store.set(id, out);
        return out;
      }

      // Otherwise update existing automation
      const update = postgres.save({ ...current, ...data });
      await database
        .update(postgresStoredAutomationTable)
        .set(update)
        .where(eq(postgresStoredAutomationTable.id, id));
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
  async function create(data: AutomationCreateOptions) {
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
  async function update(id: string, data: Partial<AutomationCreateOptions>) {
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
  function get(id: string): StoredAutomation | undefined {
    return store.get(id);
  }

  // #MARK: list
  function list(): StoredAutomation[] {
    return [...store.values()];
  }

  return { create, get, list, loadFromDB, remove, update };
}
