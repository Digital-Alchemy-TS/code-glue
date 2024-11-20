import { Type } from "@sinclair/typebox";

/**
 * Make sure to keep sqlite definitions up to date
 *
 * apps/server/src/database/services/automation.service.ts
 */
export const StoredAutomation = Type.Object(
  {
    active: Type.Boolean({ description: "Should the code in this be running" }),
    area: Type.Optional(Type.String({ description: "Home Assistant area_id" })),
    body: Type.String({ description: "Function body, in Typescript" }),
    context: Type.String({ description: "Log context" }),
    createDate: Type.Optional(Type.String({ description: "ISO timestamp" })),
    documentation: Type.String({
      description: "User provided markdown notes",
    }),
    id: Type.Optional(Type.String({ description: "UUID" })),
    labels: Type.Array(Type.String(), {
      description: "Home Assistant label_id",
    }),
    lastUpdate: Type.Optional(Type.String()),
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

export const AutomationCreateOptions = Type.Omit(StoredAutomation, [
  "lastUpdate",
  "createDate",
]);
export type AutomationCreateOptions = typeof AutomationCreateOptions.static;

export const StoredAutomationRow = Type.Intersect([
  Type.Omit(StoredAutomation, ["createDate", "lastUpdate", "active", "labels"]),
  Type.Object({
    active: Type.String(),
    createDate: Type.String(),
    labels: Type.String(),
    lastUpdate: Type.String(),
  }),
]);
export type StoredAutomationRow = typeof StoredAutomationRow.static;
