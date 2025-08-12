import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const postgresSharedVariablesTable = pgTable("shared_variables", {
  create_date: timestamp("create_date").notNull(),
  documentation: text("documentation").notNull(),
  id: text("id").primaryKey().notNull(),
  labels: text("labels").notNull(),
  last_update: timestamp("last_update").notNull(), // Stored as pipe-separated string
  title: text("title").notNull(),
  type: text("type").notNull(),
  value: text("value").notNull(),
});

export const postgresStoredAutomationTable = pgTable("stored_automation", {
  active: text("active").notNull(),
  area: text("area"),
  body: text("body").notNull(),
  context: text("context").notNull(),
  create_date: timestamp("create_date").notNull(),
  documentation: text("documentation").notNull(),
  id: text("id").primaryKey().notNull(),
  labels: text("labels").notNull(),
  // Stored as pipe-separated string
  last_update: timestamp("last_update").notNull(),
  parent: text("parent"),
  title: text("title").notNull(),
  version: text("version").notNull(),
});

export const postgresSynapseEntitiesTable = pgTable("synapse_entities", {
  attributes: text("attributes").notNull(),
  create_date: timestamp("create_date").notNull(),
  default_attributes: text("default_attributes").notNull(),
  default_config: text("default_config").notNull(),
  default_locals: text("default_locals").notNull(),
  documentation: text("documentation").notNull(),

  icon: text("icon").notNull(),

  id: text("id").primaryKey().notNull(),

  labels: text("labels").notNull(),

  last_update: timestamp("last_update").notNull(),

  locals: text("locals").notNull(),
  // Stored as pipe-separated string
  name: text("name").notNull(),
  suggested_object_id: text("suggested_object_id").notNull(),
  type: text("type").notNull(),
});

export const postgresImportTypesTable = pgTable("import_types", {
  active: text("active").notNull(),
  area: text("area"),
  body: text("body").notNull(),
  context: text("context").notNull(),
  create_date: timestamp("create_date").notNull(),
  documentation: text("documentation").notNull(),
  id: text("id").primaryKey().notNull(),
  labels: text("labels").notNull(),
  // Stored as pipe-separated string
  last_update: timestamp("last_update").notNull(),
  parent: text("parent"),
  title: text("title").notNull(),
  version: text("version").notNull(),
});

export type PostgresSharedVariableSelect = InferSelectModel<
  typeof postgresSharedVariablesTable
>;
export type PostgresSharedVariableInsert = InferInsertModel<
  typeof postgresSharedVariablesTable
>;
export type PostgresStoredAutomationSelect = InferSelectModel<
  typeof postgresStoredAutomationTable
>;
export type PostgresStoredAutomationInsert = InferInsertModel<
  typeof postgresStoredAutomationTable
>;
export type PostgresSynapseEntitySelect = InferSelectModel<
  typeof postgresSynapseEntitiesTable
>;
export type PostgresSynapseEntityInsert = InferInsertModel<
  typeof postgresSynapseEntitiesTable
>;
export type PostgresImportTypeSelect = InferSelectModel<
  typeof postgresImportTypesTable
>;
export type PostgresImportTypeInsert = InferInsertModel<
  typeof postgresImportTypesTable
>;
