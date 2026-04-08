import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const sqliteSharedVariablesTable = sqliteTable("shared_variables", {
  create_date: text("create_date").notNull(),
  documentation: text("documentation").notNull(),
  id: text("id").primaryKey().notNull(),
  labels: text("labels").notNull(),
  last_update: text("last_update").notNull(), // Stored as pipe-separated string
  title: text("title").notNull(),
  type: text("type").notNull(),
  value: text("value").notNull(),
});

export const sqliteStoredAutomationTable = sqliteTable("stored_automation", {
  active: text("active").notNull(),
  active_version_id: text("active_version_id"),
  area: text("area"),
  body: text("body").notNull(),
  context: text("context").notNull(),
  create_date: text("create_date").notNull(),
  documentation: text("documentation").notNull(),
  icon: text("icon"),
  id: text("id").primaryKey().notNull(),
  labels: text("labels").notNull(),
  // Stored as pipe-separated string
  last_update: text("last_update").notNull(),
  parent: text("parent"),
  title: text("title").notNull(),
});

export const sqliteAutomationVersionTable = sqliteTable("automation_versions", {
  activated_from_version_id: text("activated_from_version_id"),
  automation_id: text("automation_id").notNull(),
  body: text("body").notNull(),
  date: text("date").notNull(),
  documentation: text("documentation"),
  has_code_change: text("has_code_change").notNull().default("true"),
  has_notes_change: text("has_notes_change").notNull().default("false"),
  id: text("id").primaryKey().notNull(),
  is_active: text("is_active").notNull().default("false"),
  is_draft: text("is_draft").notNull().default("false"),
  name: text("name"),
  notes: text("notes"),
  parent_version_id: text("parent_version_id"),
  was_auto_saved: text("was_auto_saved").notNull().default("false"),
  written_by_ai: text("written_by_ai").notNull().default("false"),
});

export const sqliteSynapseEntitiesTable = sqliteTable("synapse_entities", {
  attributes: text("attributes").notNull(),
  create_date: text("create_date").notNull(),
  default_attributes: text("default_attributes").notNull(),
  default_config: text("default_config").notNull(),
  default_locals: text("default_locals").notNull(),
  documentation: text("documentation").notNull(),

  icon: text("icon").notNull(),

  id: text("id").primaryKey().notNull(),

  labels: text("labels").notNull(),

  last_update: text("last_update").notNull(),

  locals: text("locals").notNull(),
  // Stored as pipe-separated string
  name: text("name").notNull(),
  suggested_object_id: text("suggested_object_id").notNull(),
  type: text("type").notNull(),
});

export const sqliteImportTypesTable = sqliteTable("import_types", {
  active: text("active").notNull(),
  area: text("area"),
  body: text("body").notNull(),
  context: text("context").notNull(),
  create_date: text("create_date").notNull(),
  documentation: text("documentation").notNull(),
  id: text("id").primaryKey().notNull(),
  labels: text("labels").notNull(),
  // Stored as pipe-separated string
  last_update: text("last_update").notNull(),
  parent: text("parent"),
  title: text("title").notNull(),
  version: text("version").notNull(),
});

export type SqliteSharedVariableSelect = InferSelectModel<
  typeof sqliteSharedVariablesTable
>;
export type SqliteSharedVariableInsert = InferInsertModel<
  typeof sqliteSharedVariablesTable
>;
export type SqliteStoredAutomationSelect = InferSelectModel<
  typeof sqliteStoredAutomationTable
>;
export type SqliteStoredAutomationInsert = InferInsertModel<
  typeof sqliteStoredAutomationTable
>;
export type SqliteAutomationVersionSelect = InferSelectModel<
  typeof sqliteAutomationVersionTable
>;
export type SqliteAutomationVersionInsert = InferInsertModel<
  typeof sqliteAutomationVersionTable
>;
export type SqliteSynapseEntitySelect = InferSelectModel<
  typeof sqliteSynapseEntitiesTable
>;
export type SqliteSynapseEntityInsert = InferInsertModel<
  typeof sqliteSynapseEntitiesTable
>;
export type SqliteImportTypeSelect = InferSelectModel<
  typeof sqliteImportTypesTable
>;
export type SqliteImportTypeInsert = InferInsertModel<
  typeof sqliteImportTypesTable
>;
