import { Type } from "@sinclair/typebox";

export const SharedVariables = Type.Object(
  {
    createDate: Type.String(),
    documentation: Type.String({
      description: "User provided markdown notes",
    }),
    id: Type.String(),
    labels: Type.Array(Type.String(), {
      description: "Home Assistant label_id",
    }),
    lastUpdate: Type.String(),
    title: Type.String({ description: "Human readable title" }),
    type: Type.String({ description: "Declared type definition" }),
    value: Type.String({ description: "Serialized value" }),
  },
  { description: "Shared variables that can emit updates" },
);
export type SharedVariables = typeof SharedVariables.static;
export const SharedVariableCreateOptions = Type.Omit(SharedVariables, [
  "id",
  "lastUpdate",
  "createDate",
]);
export type SharedVariableCreateOptions =
  typeof SharedVariableCreateOptions.static;

export const SharedVariableRow = Type.Intersect([
  Type.Omit(SharedVariables, ["createDate", "lastUpdate", "labels"]),
  Type.Object({
    createDate: Type.String(),
    labels: Type.String(),
    lastUpdate: Type.String(),
  }),
]);
export type SharedVariableRow = typeof SharedVariableRow.static;
