import { Type } from "@sinclair/typebox";

export const StoredAutomation = Type.Object(
  {
    active: Type.Boolean({ description: "Should the code in this be running" }),
    area: Type.Optional(Type.String({ description: "Home Assistant area_id" })),
    body: Type.String({ description: "Function body" }),
    context: Type.String({ description: "Log context" }),
    createDate: Type.Date(),
    id: Type.String(),
    labels: Type.Array(Type.String(), {
      description: "Home Assistant label_id",
    }),
    lastUpdate: Type.Date(),
    parent: Type.Optional(
      Type.String({
        description:
          "Reference to another automation to declare as parent. For UI purposes",
      }),
    ),
    title: Type.String({ description: "Human readable title" }),
    version: Type.String({
      description: "User declared version",
    }),
  },
  { description: "Used to store the actual automation on disk" },
);
export type StoredAutomation = typeof StoredAutomation.static;
