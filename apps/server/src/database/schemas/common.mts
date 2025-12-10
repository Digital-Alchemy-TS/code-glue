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
  area?: string;
  body: string;
  context: string;
  draft?: string;
  icon?: string;
  labels: string[];
  parent?: string;
  title: string;
  documentation: string;
  version: string;
}

export interface StoredAutomation extends StoredAutomationCreateOptions {
  id: string;
  create_date: string;
  last_update: string;
}

export type StoredAutomationRow = Omit<StoredAutomation, "labels"> & {
  labels: string; // Stored as pipe-separated string in database
};

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
