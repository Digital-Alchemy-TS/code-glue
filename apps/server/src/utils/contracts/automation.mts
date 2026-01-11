import type { RemoveCallback } from "@digital-alchemy/core";
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
    createDate: Type.String({ description: "ISO timestamp" }),
    documentation: Type.String({
      description: "User provided markdown notes",
    }),
    draft: Type.Optional(Type.String({ description: "Draft edits" })),
    icon: Type.Optional(Type.String({ description: "Icon for UI" })),
    id: Type.String({ description: "UUID" }),
    labels: Type.Array(Type.String(), {
      description: "Home Assistant label_id",
    }),
    lastUpdate: Type.String({ description: "ISO timestamp" }),
    parent: Type.Optional(
      Type.String({
        description: "Reference to another automation to declare as parent. For UI purposes",
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
  "id",
  "lastUpdate",
  "createDate",
]);

export type AutomationCreateOptions = typeof AutomationCreateOptions.static;

export const AutomationUpdateOptions = Type.Omit(AutomationCreateOptions, ["id"]);

export type AutomationUpdateOptions = Partial<typeof AutomationUpdateOptions.static>;

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

export type AutomationTeardown = {
  register(remove: RemoveCallback, type: string): void;
  teardown(): void;
};
