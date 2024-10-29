import { deepExtend, TServiceParams } from "@digital-alchemy/core";
import { v4 } from "uuid";

import { ResponseHeaders } from "../helpers";

export function StatsInit({
  elysia: { app, session },
  als,
  logger,
  metrics,
  config,
}: TServiceParams) {
  app
    .trace(() => {
      // ? Creating the store here gives access through rest of request lifecycle
      // Doing it in onRequest doesn't work
      als.enterWith({ logs: { requestId: v4() } });
    })
    .onRequest(async ({ request, set }) => {
      const http = await session.gatherLocals(request);
      const storage = als.getStore();
      set.headers[ResponseHeaders.requestId] = storage.logs.requestId;

      deepExtend(storage.logs, http.trace);
      storage.http = http;
    })
    .onAfterHandle(({ request, route, store }) => {
      const storage = als.getStore();
      const ms = storage.http.perf();
      if (config.metrics.EMIT_METRICS) {
        metrics.emit("http-stats", {
          method: request.method,
          ms,
          route,
          tag: store.tag,
        });
      } else {
        logger.info({ ms }, `%s %s`, request.method, route);
      }
    });
}
