import { TServiceParams } from "@digital-alchemy/core";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { MySql2Database } from "drizzle-orm/mysql2";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import { v4 } from "uuid";

import {
  AutomationVersion,
  AutomationVersionCreateOptions,
  AutomationVersionUpdateOptions,
} from "../../utils/index.mts";
import {
  mysqlAutomationVersionTable,
  postgresAutomationVersionTable,
  sqliteAutomationVersionTable,
} from "../schemas/index.mts";

type VersionRow = {
  id: string;
  automation_id: string;
  body: string;
  date: string | Date;
  documentation: string | null;
  name: string | null;
  notes: string | null;
  is_active: string;
  is_draft: string;
  was_auto_saved: string;
  written_by_ai: string;
  has_code_change: string;
  has_notes_change: string;
  parent_version_id: string | null;
};

function loadRow(row: VersionRow): AutomationVersion {
  return {
    automationId: row.automation_id,
    body: row.body,
    date: row.date instanceof Date ? row.date.toISOString() : row.date,
    documentation: row.documentation ?? undefined,
    hasCodeChange: row.has_code_change === "true",
    hasNotesChange: row.has_notes_change === "true",
    id: row.id,
    isActive: row.is_active === "true",
    isDraft: row.is_draft === "true",
    name: row.name ?? undefined,
    notes: row.notes ?? undefined,
    parentVersionId: row.parent_version_id ?? undefined,
    wasAutoSaved: row.was_auto_saved === "true",
    writtenByAi: row.written_by_ai === "true",
  };
}

function saveRow(data: AutomationVersionCreateOptions & { id?: string }) {
  return {
    automation_id: data.automationId,
    body: data.body,
    date: data.date,
    documentation: data.documentation ?? null,
    has_code_change: data.hasCodeChange ? "true" : "false",
    has_notes_change: data.hasNotesChange ? "true" : "false",
    id: data.id ?? "",
    is_active: data.isActive ? "true" : "false",
    is_draft: data.isDraft ? "true" : "false",
    name: data.name ?? null,
    notes: data.notes ?? null,
    parent_version_id: data.parentVersionId ?? null,
    was_auto_saved: data.wasAutoSaved ? "true" : "false",
    written_by_ai: data.writtenByAi ? "true" : "false",
  };
}

function saveRowMysql(data: AutomationVersionCreateOptions & { id?: string }) {
  return {
    ...saveRow(data),
    date: new Date(data.date),
  };
}

export function AutomationVersionTable({
  lifecycle,
  config,
  synapse,
  context,
  metrics,
}: TServiceParams) {
  const store = new Map<string, AutomationVersion>();

  lifecycle.onBootstrap(function () {
    loadFromDB();
  });

  const sqlite = {
    async create(data: AutomationVersionCreateOptions) {
      const database = synapse.database.getDatabase() as ReturnType<typeof drizzle>;
      const id = v4();
      const row = { ...saveRow(data), id };
      await database.insert(sqliteAutomationVersionTable).values(row);
      const out = loadRow(row);
      store.set(id, out);
      return out;
    },

    async loadFromDB() {
      const database = synapse.database.getDatabase() as ReturnType<typeof drizzle>;
      metrics.measure([context, "loadFromDB"], function () {
        const rows = database.select().from(sqliteAutomationVersionTable).all();
        rows.forEach(function (row) {
          const loaded = loadRow(row as VersionRow);
          store.set(loaded.id, loaded);
        });
      });
    },

    async remove(id: string) {
      const database = synapse.database.getDatabase() as ReturnType<typeof drizzle>;
      store.delete(id);
      await database
        .delete(sqliteAutomationVersionTable)
        .where(eq(sqliteAutomationVersionTable.id, id));
    },

    async removeForAutomation(automationId: string) {
      const database = synapse.database.getDatabase() as ReturnType<typeof drizzle>;
      for (const [id, v] of store) {
        if (v.automationId === automationId) store.delete(id);
      }
      await database
        .delete(sqliteAutomationVersionTable)
        .where(eq(sqliteAutomationVersionTable.automation_id, automationId));
    },

    async update(id: string, data: AutomationVersionUpdateOptions) {
      const database = synapse.database.getDatabase() as ReturnType<typeof drizzle>;
      const current = store.get(id);
      if (!current) return undefined;
      const merged = { ...current, ...data };
      const row = { ...saveRow(merged as AutomationVersionCreateOptions), id };
      await database
        .update(sqliteAutomationVersionTable)
        .set(row)
        .where(eq(sqliteAutomationVersionTable.id, id));
      const out = loadRow(row);
      store.set(id, out);
      return out;
    },
  };

  const mysql = {
    async create(data: AutomationVersionCreateOptions) {
      const database = synapse.database.getDatabase() as MySql2Database<Record<string, unknown>>;
      const id = v4();
      const row = { ...saveRowMysql(data), id };
      await database.insert(mysqlAutomationVersionTable).values(row);
      const out = loadRow({ ...row, date: row.date.toISOString() });
      store.set(id, out);
      return out;
    },

    async loadFromDB() {
      const database = synapse.database.getDatabase() as MySql2Database<Record<string, unknown>>;
      metrics.measure([context, "loadFromDB"], async function () {
        const rows = await database.select().from(mysqlAutomationVersionTable).execute();
        rows.forEach(function (row) {
          const loaded = loadRow(row as unknown as VersionRow);
          store.set(loaded.id, loaded);
        });
      });
    },

    async remove(id: string) {
      const database = synapse.database.getDatabase() as MySql2Database<Record<string, unknown>>;
      store.delete(id);
      await database
        .delete(mysqlAutomationVersionTable)
        .where(eq(mysqlAutomationVersionTable.id, id));
    },

    async removeForAutomation(automationId: string) {
      const database = synapse.database.getDatabase() as MySql2Database<Record<string, unknown>>;
      for (const [id, v] of store) {
        if (v.automationId === automationId) store.delete(id);
      }
      await database
        .delete(mysqlAutomationVersionTable)
        .where(eq(mysqlAutomationVersionTable.automation_id, automationId));
    },

    async update(id: string, data: AutomationVersionUpdateOptions) {
      const database = synapse.database.getDatabase() as MySql2Database<Record<string, unknown>>;
      const current = store.get(id);
      if (!current) return undefined;
      const merged = { ...current, ...data };
      const row = { ...saveRowMysql(merged as AutomationVersionCreateOptions), id };
      await database
        .update(mysqlAutomationVersionTable)
        .set(row)
        .where(eq(mysqlAutomationVersionTable.id, id));
      const out = loadRow({ ...row, date: row.date.toISOString() });
      store.set(id, out);
      return out;
    },
  };

  const postgres = {
    async create(data: AutomationVersionCreateOptions) {
      const database = synapse.database.getDatabase() as ReturnType<typeof drizzlePostgres>;
      const id = v4();
      const row = { ...saveRowMysql(data), id };
      await database.insert(postgresAutomationVersionTable).values(row);
      const out = loadRow({ ...row, date: row.date.toISOString() });
      store.set(id, out);
      return out;
    },

    async loadFromDB() {
      const database = synapse.database.getDatabase() as ReturnType<typeof drizzlePostgres>;
      metrics.measure([context, "loadFromDB"], async function () {
        const rows = await database.select().from(postgresAutomationVersionTable).execute();
        rows.forEach(function (row) {
          const loaded = loadRow(row as unknown as VersionRow);
          store.set(loaded.id, loaded);
        });
      });
    },

    async remove(id: string) {
      const database = synapse.database.getDatabase() as ReturnType<typeof drizzlePostgres>;
      store.delete(id);
      await database
        .delete(postgresAutomationVersionTable)
        .where(eq(postgresAutomationVersionTable.id, id));
    },

    async removeForAutomation(automationId: string) {
      const database = synapse.database.getDatabase() as ReturnType<typeof drizzlePostgres>;
      for (const [id, v] of store) {
        if (v.automationId === automationId) store.delete(id);
      }
      await database
        .delete(postgresAutomationVersionTable)
        .where(eq(postgresAutomationVersionTable.automation_id, automationId));
    },

    async update(id: string, data: AutomationVersionUpdateOptions) {
      const database = synapse.database.getDatabase() as ReturnType<typeof drizzlePostgres>;
      const current = store.get(id);
      if (!current) return undefined;
      const merged = { ...current, ...data };
      const row = { ...saveRowMysql(merged as AutomationVersionCreateOptions), id };
      await database
        .update(postgresAutomationVersionTable)
        .set(row)
        .where(eq(postgresAutomationVersionTable.id, id));
      const out = loadRow({ ...row, date: row.date.toISOString() });
      store.set(id, out);
      return out;
    },
  };

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

  async function create(data: AutomationVersionCreateOptions) {
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

  async function update(id: string, data: AutomationVersionUpdateOptions) {
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

  async function remove(id: string) {
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

  async function removeForAutomation(automationId: string) {
    const dbType = config.synapse.DATABASE_TYPE;
    switch (dbType) {
      case "mysql":
        await mysql.removeForAutomation(automationId);
        break;
      case "postgresql":
        await postgres.removeForAutomation(automationId);
        break;
      case "sqlite":
      default:
        await sqlite.removeForAutomation(automationId);
        break;
    }
  }

  function get(id: string): AutomationVersion | undefined {
    return store.get(id);
  }

  function listForAutomation(automationId: string): AutomationVersion[] {
    return [...store.values()].filter((v) => v.automationId === automationId);
  }

  return { create, get, listForAutomation, loadFromDB, remove, removeForAutomation, update };
}
