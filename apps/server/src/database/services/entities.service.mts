import { is, TServiceParams } from "@digital-alchemy/core";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { MySql2Database } from "drizzle-orm/mysql2";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import { v4 } from "uuid";

import {
  SYNAPSE_ENTITIES_ADDED,
  SYNAPSE_ENTITIES_REMOVED,
  SynapseEntities,
  SynapseEntityCreateOptions,
  SynapseEntityTypes,
} from "../../utils/index.mts";
import {
  mysqlSynapseEntitiesTable,
  postgresSynapseEntitiesTable,
  sqliteSynapseEntitiesTable,
} from "../schemas/index.mts";

// Common base type for all database entities
type CommonEntityRow = {
  id: string;
  name: string;
  type: string;
  attributes: string;
  default_config: string;
  icon: string;
  locals: string;
  suggested_object_id: string;
  default_attributes: string;
  default_locals: string;
  documentation: string;
  labels: string;
};

// Database-specific extensions
type SqliteEntityRow = CommonEntityRow & {
  create_date: string;
  last_update: string;
};

type MysqlEntityRow = CommonEntityRow & {
  create_date: Date;
  last_update: Date;
};

type PostgresEntityRow = CommonEntityRow & {
  create_date: Date;
  last_update: Date;
};

// Database save result types
type SqliteEntitySave = CommonEntityRow & {
  create_date: string;
  last_update: string;
};

type MysqlEntitySave = CommonEntityRow & {
  create_date: Date;
  last_update: Date;
};

type PostgresEntitySave = CommonEntityRow & {
  create_date: Date;
  last_update: Date;
};

export function SynapseEntitiesTable({
  lifecycle,
  config,
  logger,
  event,
  synapse,
  context,
  metrics,
}: TServiceParams) {
  const store = new Map<string, SynapseEntities>();

  lifecycle.onBootstrap(function () {
    loadFromDB();
  });

  // Database-specific implementations
  const sqlite = {
    async create(data: SynapseEntityCreateOptions) {
      const database = synapse.database.getDatabase() as ReturnType<
        typeof drizzle
      >;
      const id = (data as any).id || v4();
      const row = { id, ...sqlite.save(data) };
      await database.insert(sqliteSynapseEntitiesTable).values(row);
      const out = sqlite.load(row);
      store.set(row.id, out);
      event.emit(SYNAPSE_ENTITIES_ADDED, out);
      return out;
    },

    load(row: SqliteEntityRow): SynapseEntities {
      return {
        attributes: row.attributes,
        createDate: row.create_date,
        defaultAttributes: row.default_attributes,
        defaultConfig: row.default_config,
        defaultLocals: row.default_locals,
        documentation: row.documentation,
        icon: row.icon,
        id: row.id,
        labels: is.empty(row.labels) ? [] : row.labels.split("|"),
        lastUpdate: row.last_update,
        locals: row.locals,
        name: row.name,
        suggested_object_id: row.suggested_object_id,
        type: row.type as SynapseEntityTypes,
      } as SynapseEntities;
    },

    async loadFromDB() {
      const database = synapse.database.getDatabase() as ReturnType<
        typeof drizzle
      >;
      store.clear();
      metrics.measure([context, "loadFromDB"], function () {
        const rows = database.select().from(sqliteSynapseEntitiesTable).all();
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
        .delete(sqliteSynapseEntitiesTable)
        .where(eq(sqliteSynapseEntitiesTable.id, id)).run();
      event.emit(SYNAPSE_ENTITIES_REMOVED, id);
    },

    save(data: SynapseEntities | SynapseEntityCreateOptions): SqliteEntitySave {
      const now = new Date().toISOString();
      return {
        attributes: data.attributes,
        create_date: (data as SynapseEntities).createDate ?? now,
        default_attributes: data.defaultAttributes,
        default_config: data.defaultConfig,
        default_locals: data.defaultLocals,
        documentation: data.documentation,
        icon: data.icon,
        id: (data as SynapseEntities).id || "",
        labels: data.labels.join("|"),
        last_update: now,
        locals: data.locals,
        name: data.name,
        suggested_object_id: data.suggested_object_id,
        type: data.type,
      };
    },

    async update(id: string, data: Partial<SynapseEntityCreateOptions>) {
      const database = synapse.database.getDatabase() as ReturnType<
        typeof drizzle
      >;
      const current = store.get(id);
      
      if (!current) {
        // If entity doesn't exist, create it with the provided ID
        const row = { id, ...sqlite.save(data as SynapseEntityCreateOptions) };
        await database.insert(sqliteSynapseEntitiesTable).values(row);
        const out = sqlite.load(row);
        store.set(id, out);
        event.emit(SYNAPSE_ENTITIES_ADDED, out);
        return out;
      }
      
      // Otherwise update existing entity
      const update = sqlite.save({ ...current, ...data });
      await database
        .update(sqliteSynapseEntitiesTable)
        .set(update)
        .where(eq(sqliteSynapseEntitiesTable.id, id));
      const out = sqlite.load(update);
      store.set(id, out);
      // does not emit anything
      // in order to affect the entity, a rebuild is needed
      return out;
    },
  };

  const mysql = {
    async create(data: SynapseEntityCreateOptions) {
      const database = synapse.database.getDatabase() as MySql2Database<
        Record<string, unknown>
      >;
      const id = (data as any).id || v4();
      const row = { id, ...mysql.save(data) };
      await database.insert(mysqlSynapseEntitiesTable).values(row);
      const out = mysql.load(row);
      store.set(row.id, out);
      event.emit(SYNAPSE_ENTITIES_ADDED, out);
      return out;
    },

    load(row: MysqlEntityRow): SynapseEntities {
      return {
        attributes: row.attributes,
        createDate: row.create_date.toISOString(),
        defaultAttributes: row.default_attributes,
        defaultConfig: row.default_config,
        defaultLocals: row.default_locals,
        documentation: row.documentation,
        icon: row.icon,
        id: row.id,
        labels: is.empty(row.labels) ? [] : row.labels.split("|"),
        lastUpdate: row.last_update.toISOString(),
        locals: row.locals,
        name: row.name,
        suggested_object_id: row.suggested_object_id,
        type: row.type as SynapseEntityTypes,
      } as SynapseEntities;
    },

    async loadFromDB() {
      const database = synapse.database.getDatabase() as MySql2Database<
        Record<string, unknown>
      >;
      store.clear();
      metrics.measure([context, "loadFromDB"], async function () {
        const rows = await database
          .select()
          .from(mysqlSynapseEntitiesTable)
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
        .delete(mysqlSynapseEntitiesTable)
        .where(eq(mysqlSynapseEntitiesTable.id, id));
      event.emit(SYNAPSE_ENTITIES_REMOVED, id);
    },

    save(data: SynapseEntities | SynapseEntityCreateOptions): MysqlEntitySave {
      const now = new Date();
      return {
        attributes: data.attributes,
        create_date: (data as SynapseEntities).createDate
          ? new Date((data as SynapseEntities).createDate)
          : now,
        default_attributes: data.defaultAttributes,
        default_config: data.defaultConfig,
        default_locals: data.defaultLocals,
        documentation: data.documentation,
        icon: data.icon,
        id: (data as SynapseEntities).id || "",
        labels: data.labels.join("|"),
        last_update: now,
        locals: data.locals,
        name: data.name,
        suggested_object_id: data.suggested_object_id,
        type: data.type,
      };
    },

    async update(id: string, data: Partial<SynapseEntityCreateOptions>) {
      const database = synapse.database.getDatabase() as MySql2Database<
        Record<string, unknown>
      >;
      const current = store.get(id);
      
      if (!current) {
        // If entity doesn't exist, create it with the provided ID
        const row = { id, ...mysql.save(data as SynapseEntityCreateOptions) };
        await database.insert(mysqlSynapseEntitiesTable).values(row);
        const out = mysql.load(row);
        store.set(id, out);
        event.emit(SYNAPSE_ENTITIES_ADDED, out);
        return out;
      }
      
      // Otherwise update existing entity
      // Convert the current entity to the format expected by save
      const currentForSave: SynapseEntityCreateOptions = {
        ...current,
      };
      const update = mysql.save({ ...currentForSave, ...data });
      await database
        .update(mysqlSynapseEntitiesTable)
        .set(update)
        .where(eq(mysqlSynapseEntitiesTable.id, id));
      const out = mysql.load(update);
      store.set(id, out);
      // does not emit anything
      // in order to affect the entity, a rebuild is needed
      return out;
    },
  };

  const postgres = {
    async create(data: SynapseEntityCreateOptions) {
      const database = synapse.database.getDatabase() as ReturnType<
        typeof drizzlePostgres
      >;
      const id = (data as any).id || v4();
      const row = { id, ...postgres.save(data) };
      await database.insert(postgresSynapseEntitiesTable).values(row);
      const out = postgres.load(row);
      store.set(row.id, out);
      event.emit(SYNAPSE_ENTITIES_ADDED, out);
      return out;
    },

    load(row: PostgresEntityRow): SynapseEntities {
      return {
        attributes: row.attributes,
        createDate: row.create_date.toISOString(),
        defaultAttributes: row.default_attributes,
        defaultConfig: row.default_config,
        defaultLocals: row.default_locals,
        documentation: row.documentation,
        icon: row.icon,
        id: row.id,
        labels: is.empty(row.labels) ? [] : row.labels.split("|"),
        lastUpdate: row.last_update.toISOString(),
        locals: row.locals,
        name: row.name,
        suggested_object_id: row.suggested_object_id,
        type: row.type as SynapseEntityTypes,
      } as SynapseEntities;
    },

    async loadFromDB() {
      const database = synapse.database.getDatabase() as ReturnType<
        typeof drizzlePostgres
      >;
      store.clear();
      metrics.measure([context, "loadFromDB"], async function () {
        const rows = await database
          .select()
          .from(postgresSynapseEntitiesTable)
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
        .delete(postgresSynapseEntitiesTable)
        .where(eq(postgresSynapseEntitiesTable.id, id));
      event.emit(SYNAPSE_ENTITIES_REMOVED, id);
    },

    save(
      data: SynapseEntities | SynapseEntityCreateOptions,
    ): PostgresEntitySave {
      const now = new Date();
      return {
        attributes: data.attributes,
        create_date: (data as SynapseEntities).createDate
          ? new Date((data as SynapseEntities).createDate)
          : now,
        default_attributes: data.defaultAttributes,
        default_config: data.defaultConfig,
        default_locals: data.defaultLocals,
        documentation: data.documentation,
        icon: data.icon,
        id: (data as SynapseEntities).id || "",
        labels: data.labels.join("|"),
        last_update: now,
        locals: data.locals,
        name: data.name,
        suggested_object_id: data.suggested_object_id,
        type: data.type,
      };
    },

    async update(id: string, data: Partial<SynapseEntityCreateOptions>) {
      const database = synapse.database.getDatabase() as ReturnType<
        typeof drizzlePostgres
      >;
      const current = store.get(id);
      
      if (!current) {
        // If entity doesn't exist, create it with the provided ID
        const row = { id, ...postgres.save(data as SynapseEntityCreateOptions) };
        await database.insert(postgresSynapseEntitiesTable).values(row);
        const out = postgres.load(row);
        store.set(id, out);
        event.emit(SYNAPSE_ENTITIES_ADDED, out);
        return out;
      }
      
      // Otherwise update existing entity
      const update = postgres.save({ ...current, ...data });
      await database
        .update(postgresSynapseEntitiesTable)
        .set(update)
        .where(eq(postgresSynapseEntitiesTable.id, id));
      const out = postgres.load(update);
      store.set(id, out);
      // does not emit anything
      // in order to affect the entity, a rebuild is needed
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
  async function create(data: SynapseEntityCreateOptions) {
    const dbType = config.synapse.DATABASE_TYPE;
    switch (dbType) {
      case "mysql":
        return await mysql.create(data);
      case "postgresql":
        return await postgres.create(data);
      case "sqlite":
      default:
        return sqlite.create(data);
    }
  }

  // #MARK: update
  async function update(id: string, data: Partial<SynapseEntityCreateOptions>) {
    const dbType = config.synapse.DATABASE_TYPE;
    switch (dbType) {
      case "mysql":
        return await mysql.update(id, data);
      case "postgresql":
        return await postgres.update(id, data);
      case "sqlite":
      default:
        return sqlite.update(id, data);
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
        sqlite.remove(id);
        break;
    }
  }

  // #MARK: get
  function get(id: string): SynapseEntities | undefined {
    return store.get(id);
  }

  // #MARK: list
  function list(): SynapseEntities[] {
    return [...store.values()];
  }

  return { create, get, list, loadFromDB, remove, update };
}
