import { Type } from "@sinclair/typebox";

export const SharedVariables = Type.Object(
  {
    createDate: Type.Date(),
    documentation: Type.String({
      description: "User provided markdown notes",
    }),
    id: Type.String(),
    labels: Type.Array(Type.String(), {
      description: "Home Assistant label_id",
    }),
    lastUpdate: Type.Date(),
    title: Type.String({ description: "Human readable title" }),
    type: Type.String({ description: "Declared type definition" }),
    value: Type.String({ description: "Serialized value" }),
  },
  { description: "Shared variables that can emit updates" },
);
export type SharedVariables = typeof SharedVariables.static;
