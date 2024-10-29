import { TServiceParams } from "@digital-alchemy/core";
import bearer from "@elysiajs/bearer";
import cors from "@elysiajs/cors";
import serverTiming from "@elysiajs/server-timing";
import swagger from "@elysiajs/swagger";
import { helmet } from "elysia-helmet";

import { description, name, version } from "../../../package.json";

export function ElysiaMiddleware({
  elysia: { app },
  config,
  lifecycle,
}: TServiceParams) {
  lifecycle.onPostConfig(() => {
    app.use(bearer());

    if (config.elysia.SWAGGER) {
      app.use(
        swagger({
          autoDarkMode: true,
          documentation: {
            info: {
              description,
              title: name,
              version,
            },
            tags: [
              {
                description:
                  "Blocked by admin key header, for managing the server directly",
                name: "admin",
              },
              {
                description: "Intended for consumption by DataDog synthetics",
                name: "synthetics",
              },
            ],
          },
          path: "/swagger",
        }),
      );
    }

    if (config.elysia.CORS) {
      app.use(cors());
    }
    if (config.elysia.HELMET) {
      app.use(helmet());
    }
    if (config.elysia.SEND_TIMING) {
      app.use(serverTiming());
    }
  });
}
