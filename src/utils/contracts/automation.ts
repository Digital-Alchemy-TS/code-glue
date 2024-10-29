import { t } from "elysia";

export const StoredAutomation = t.Object(
  {
    active: t.Boolean({ description: "Should the code in this be running" }),
    area: t.Optional(t.String({ description: "Home Assistant area_id" })),
    body: t.String({ description: "Function body" }),
    context: t.String({ description: "Log context" }),
    createDate: t.Date(),
    id: t.String(),
    labels: t.Array(t.String(), {
      description: "Home Assistant label_id",
    }),
    lastUpdate: t.Date(),
    parent: t.Optional(
      t.String({
        description:
          "Reference to another automation to declare as parent. For UI purposes",
      }),
    ),
    title: t.String({ description: "Human readable title" }),
    version: t.String({
      description: "User declared version",
    }),
  },
  { description: "Used to store the actual automation on disk" },
);
export type StoredAutomation = typeof StoredAutomation.static;
