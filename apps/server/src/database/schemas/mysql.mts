import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const mysqlSharedVariablesTable = mysqlTable("shared_variables", {
  create_date: timestamp("create_date").notNull(),
  documentation: text("documentation").notNull(),
  id: varchar("id", { length: 36 }).primaryKey().notNull(),
  labels: text("labels").notNull(),
  last_update: timestamp("last_update").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  type: varchar("type", { length: 100 }).notNull(),
  value: text("value").notNull(),
});

export const mysqlStoredAutomationTable = mysqlTable("stored_automation", {
  active: varchar("active", { length: 10 }).notNull(),
  // 'true'/'false' or '1'/'0'
  area: varchar("area", { length: 100 }),
  body: text("body").notNull(),
  context: varchar("context", { length: 100 }).notNull(),
  create_date: timestamp("create_date").notNull(),
  documentation: text("documentation").notNull(),
  id: varchar("id", { length: 36 }).primaryKey().notNull(),
  // Stored as pipe-separated string
  labels: text("labels").notNull(),
  last_update: timestamp("last_update").notNull(),
  parent: varchar("parent", { length: 36 }),
  title: varchar("title", { length: 255 }).notNull(),
  version: varchar("version", { length: 50 }).notNull(),
});

export const mysqlSynapseEntitiesTable = mysqlTable("synapse_entities", {
  attributes: text("attributes").notNull(),
  create_date: timestamp("create_date").notNull(),
  default_attributes: text("default_attributes").notNull(),
  default_config: text("default_config").notNull(),
  default_locals: text("default_locals").notNull(),
  documentation: text("documentation").notNull(),
  icon: varchar("icon", { length: 100 }).notNull(),
  id: varchar("id", { length: 36 }).primaryKey().notNull(),
  labels: text("labels").notNull(),
  last_update: timestamp("last_update").notNull(),
  locals: text("locals").notNull(),
  // Stored as pipe-separated string
  name: varchar("name", { length: 255 }).notNull(),
  suggested_object_id: varchar("suggested_object_id", {
    length: 255,
  }).notNull(),
  type: varchar("type", { length: 100 }).notNull(),
});

export const mysqlImportTypesTable = mysqlTable("import_types", {
  active: varchar("active", { length: 10 }).notNull(),
  // 'true'/'false' or '1'/'0'
  area: varchar("area", { length: 100 }),
  body: text("body").notNull(),
  context: varchar("context", { length: 100 }).notNull(),
  create_date: timestamp("create_date").notNull(),
  documentation: text("documentation").notNull(),
  id: varchar("id", { length: 36 }).primaryKey().notNull(),
  labels: text("labels").notNull(),
  // Stored as pipe-separated string
  last_update: timestamp("last_update").notNull(),
  parent: varchar("parent", { length: 36 }),
  title: varchar("title", { length: 255 }).notNull(),
  version: varchar("version", { length: 50 }).notNull(),
});

export type MysqlSharedVariableSelect = InferSelectModel<
  typeof mysqlSharedVariablesTable
>;
export type MysqlSharedVariableInsert = InferInsertModel<
  typeof mysqlSharedVariablesTable
>;
export type MysqlStoredAutomationSelect = InferSelectModel<
  typeof mysqlStoredAutomationTable
>;
export type MysqlStoredAutomationInsert = InferInsertModel<
  typeof mysqlStoredAutomationTable
>;
export type MysqlSynapseEntitySelect = InferSelectModel<
  typeof mysqlSynapseEntitiesTable
>;
export type MysqlSynapseEntityInsert = InferInsertModel<
  typeof mysqlSynapseEntitiesTable
>;
export type MysqlImportTypeSelect = InferSelectModel<
  typeof mysqlImportTypesTable
>;
export type MysqlImportTypeInsert = InferInsertModel<
  typeof mysqlImportTypesTable
>;
