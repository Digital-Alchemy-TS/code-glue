import { t } from "elysia";

export const DeclaredEntities = t.Object(
  {
    // id
    // lastUpdate
    // createDate
    // details
    // remote_id
  },
  {
    description: "For building synapse entities",
  },
);
export type DeclaredEntities = typeof DeclaredEntities.static;
