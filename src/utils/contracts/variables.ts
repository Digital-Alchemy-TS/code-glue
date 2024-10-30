import { Type } from "@sinclair/typebox";

export const SharedVariables = Type.Object(
  {
    createDate: Type.Date(),
    id: Type.String(),
    lastUpdate: Type.Date(),
    title: Type.String({ description: "Human readable title" }),
    type: Type.String({ description: "Declared type definition" }),
    value: Type.String({ description: "Serialized value" }),
  },
  { description: "Shared variables that can emit updates" },
);
export type SharedVariables = typeof SharedVariables.static;
