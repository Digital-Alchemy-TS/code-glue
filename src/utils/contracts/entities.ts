import { Type } from "@sinclair/typebox";

export const DeclaredEntities = Type.Object(
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
