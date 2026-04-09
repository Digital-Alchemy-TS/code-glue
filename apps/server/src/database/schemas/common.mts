export interface SharedVariableCreateOptions {
  documentation: string;
  labels: string[];
  title: string;
  type: string;
  value: string;
}

export interface SharedVariables extends SharedVariableCreateOptions {
  id: string;
  create_date: string;
  last_update: string;
}

export type SharedVariableRow = Omit<SharedVariables, "labels"> & {
  labels: string; // Stored as pipe-separated string in database
};

export interface StoredAutomationCreateOptions {
  active: string;
  active_version_id?: string;
  area?: string;
  body: string;
  context: string;
  icon?: string;
  labels: string[];
  parent?: string;
  title: string;
  documentation: string;
}

export interface StoredAutomation extends StoredAutomationCreateOptions {
  id: string;
  create_date: string;
  last_update: string;
}

export type StoredAutomationRow = Omit<StoredAutomation, "labels"> & {
  labels: string; // Stored as pipe-separated string in database
};

export interface AutomationVersionCreateOptions {
  automation_id: string;
  body: string;
  createDate: string;
  is_active: string;
  is_draft: string;
  name?: string;
  notes?: string;
  parent_version_id?: string;
  was_auto_saved: string;
  written_by_ai: string;
}

export interface AutomationVersion extends AutomationVersionCreateOptions {
  id: string;
}

export type AutomationVersionUpdateOptions = Partial<
  Omit<AutomationVersionCreateOptions, "automation_id">
>;

export interface SynapseEntityCreateOptions {
  documentation: string;
  labels: string[];
  name: string;
  type: string;
  attributes: string;
  default_config: string;
  icon: string;
  locals: string;
  suggested_object_id: string;
  default_attributes: string;
  default_locals: string;
}

export interface SynapseEntity extends SynapseEntityCreateOptions {
  id: string;
  create_date: string;
  last_update: string;
}

export type SynapseEntityRow = Omit<SynapseEntity, "labels"> & {
  labels: string; // Stored as pipe-separated string in database
};

export interface ImportTypeCreateOptions {
  active: string;
  area?: string;
  body: string;
  context: string;
  labels: string[];
  parent?: string;
  title: string;
  documentation: string;
  version: string;
}

export interface ImportType extends ImportTypeCreateOptions {
  id: string;
  create_date: string;
  last_update: string;
}

export type ImportTypeRow = Omit<ImportType, "labels"> & {
  labels: string; // Stored as pipe-separated string in database
};
