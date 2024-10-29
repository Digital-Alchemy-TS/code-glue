import { Type } from "@sinclair/typebox";

export const StoredAutomation = Type.Object(
  {
    // id
    // lastUpdate
    // createDate
    // title
    // context
    // function text
    // active boolean
  },
  { description: "Used to store the actual automation on disk" },
);

export const SharedVariables = Type.Object(
  {
    // id
    // lastUpdate
    // createDate
    // title
    // type definition
  },
  { description: "Shared variables that can emit updates" },
);
