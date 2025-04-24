import { Type } from "@sinclair/typebox";

export enum SynapseEntityTypes {
  binary_sensor = "binary_sensor",
  button = "button",
  date = "date",
  datetime = "datetime",
  number = "number",
  scene = "scene",
  select = "select",
  sensor = "sensor",
  switch = "switch",
  text = "text",
  time = "time",
}

export const SynapseEntities = Type.Object(
  {
    attributes: Type.String({ description: "type definition (for an object)" }),
    createDate: Type.String({ description: "iso date string" }),
    defaultAttributes: Type.String({ description: "json object" }),
    defaultConfig: Type.String({
      description:
        "json object: default config properties passed into creation",
    }),
    defaultLocals: Type.String({ description: "json object" }),
    documentation: Type.String({
      description: "User provided markdown notes",
    }),
    icon: Type.String({ description: "mdi icon to associate with entity" }),
    id: Type.String({ description: "uuid" }),
    labels: Type.Array(Type.String(), {
      description: "Home Assistant label_id",
    }),
    lastUpdate: Type.String({ description: "iso date string" }),
    locals: Type.String({ description: "type definition (for an object)" }),
    name: Type.String({ description: "friendly name for dashboards" }),
    suggested_object_id: Type.String({
      description: "Used to influence entity id creation",
    }),
    type: Type.Enum(SynapseEntityTypes, {
      description:
        "What type of entity to create? Built as allowlist to only allow known stable domains",
    }),
  },
  { description: "For building synapse entities" },
);
export type SynapseEntities = typeof SynapseEntities.static;

export const SynapseEntityCreateOptions = Type.Omit(SynapseEntities, [
  "id",
  "lastUpdate",
  "createDate",
]);
export type SynapseEntityCreateOptions =
  typeof SynapseEntityCreateOptions.static;

export const SynapseEntityUpdateOptions = Type.Omit(
  SynapseEntityCreateOptions,
  ["id"],
);

export type SynapseEntityUpdateOptions = Partial<
  typeof SynapseEntityUpdateOptions.static
>;

export const SynapseEntityRow = Type.Intersect([
  Type.Omit(SynapseEntities, ["createDate", "lastUpdate", "labels"]),
  Type.Object({
    createDate: Type.String(),
    labels: Type.String(),
    lastUpdate: Type.String(),
  }),
]);
export type SynapseEntityRow = typeof SynapseEntityRow.static;

export const SYNAPSE_ENTITIES_ADDED = "SYNAPSE_ENTITIES_ADDED";
export const SYNAPSE_ENTITIES_REMOVED = "SYNAPSE_ENTITIES_REMOVED";
