import { OpenAPIV3 } from "openapi-types";

export interface RequestLocals {
  perf: () => number;
}

export const tagRoute =
  (tag: string) =>
  ({ store }: { store: { tag: string } }) => {
    store.tag = tag;
  };

export enum ResponseHeaders {
  requestId = "x-request-id",
}

export type RouteDetails = Pick<
  OpenAPIV3.OperationObject,
  "description" | "summary" | "tags"
>;
