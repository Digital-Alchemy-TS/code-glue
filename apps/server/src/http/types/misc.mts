import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { Type as t } from "@sinclair/typebox";
import {
  FastifyBaseLogger,
  FastifyInstance,
  RouteShorthandOptions,
} from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";

import { RequestHeaders } from "../../utils/index.mts";

export interface SessionData {
  id?: string;
}

export interface RequestLocals {
  trace: Partial<Record<RequestHeaders, string>>;
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

export const CommonHeaders = t.Object({
  [RequestHeaders.correlationId]: t.String(),
});
export type CommonHeaders = typeof CommonHeaders.static;

export type HttpInstance = FastifyInstance<
  Server<typeof IncomingMessage, typeof ServerResponse>,
  IncomingMessage,
  ServerResponse<IncomingMessage>,
  FastifyBaseLogger,
  TypeBoxTypeProvider
>;

/**
 * https://fastify.dev/docs/latest/Reference/Lifecycle/
 */
export type FastifyHooks = Pick<
  RouteShorthandOptions,
  | "onRequest"
  // | "preParsing"
  // | "preValidation"
  | "preHandler"
  // | "preSerialization"
  // | "onSend"
  // | "onResponse"
  // | "onTimeout"
  // | "onError"
  // | "onRequestAbort"
>;

export const GENERIC_SUCCESS_RESPONSE = { success: true };
export type GENERIC_SUCCESS_RESPONSE = typeof GENERIC_SUCCESS_RESPONSE;
