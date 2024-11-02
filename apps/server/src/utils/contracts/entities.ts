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
    attributes: Type.String(),
    createDate: Type.String(),
    defaultConfig: Type.String(),
    documentation: Type.String({
      description: "User provided markdown notes",
    }),
    icon: Type.String(),
    id: Type.String(),
    labels: Type.Array(Type.String(), {
      description: "Home Assistant label_id",
    }),
    lastUpdate: Type.String(),
    local: Type.String(),
    name: Type.String(),
    suggested_object_id: Type.String(),
    type: Type.Enum(SynapseEntityTypes),
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

export const SynapseEntityRow = Type.Intersect([
  Type.Omit(SynapseEntities, ["createDate", "lastUpdate", "labels"]),
  Type.Object({
    createDate: Type.String(),
    labels: Type.String(),
    lastUpdate: Type.String(),
  }),
]);
export type SynapseEntityRow = typeof SynapseEntityRow.static;
