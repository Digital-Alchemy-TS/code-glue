import { t } from "elysia";

export const SharedVariables = t.Object(
  {
    createDate: t.Date(),
    id: t.String(),
    lastUpdate: t.Date(),
    title: t.String({ description: "Human readable title" }),
    type: t.String({ description: "Declared type definition" }),
    value: t.String({ description: "Serialized value" }),
  },
  { description: "Shared variables that can emit updates" },
);
export type SharedVariables = typeof SharedVariables.static;
