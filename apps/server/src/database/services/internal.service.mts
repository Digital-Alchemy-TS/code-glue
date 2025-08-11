import { TServiceParams } from "@digital-alchemy/core";
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { MySql2Database } from "drizzle-orm/mysql2";
import { migrate as migrateMysql } from "drizzle-orm/mysql2/migrator";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { migrate as migratePostgres } from "drizzle-orm/postgres-js/migrator";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const MIGRATION_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "..",
  "migrations",
);
const EARLY = -500;

export function DatabaseInternalsService({
  lifecycle,
  logger,
  synapse,
  config,
}: TServiceParams) {
  lifecycle.onBootstrap(async () => {
    switch (config.synapse.DATABASE_TYPE) {
      case "mysql": {
        await migrateMysql(
          synapse.database.getDatabase() as MySql2Database<
            Record<string, unknown>
          >,
          { migrationsFolder: join(MIGRATION_PATH, "mysql") },
        );
        return;
      }
      case "postgresql": {
        await migratePostgres(
          synapse.database.getDatabase() as PostgresJsDatabase<
            Record<string, unknown>
          >,
          { migrationsFolder: join(MIGRATION_PATH, "postgresql") },
        );
        return;
      }
      default: {
        await migrate(
          synapse.database.getDatabase() as BetterSQLite3Database<
            Record<string, unknown>
          >,
          { migrationsFolder: join(MIGRATION_PATH, "sqlite") },
        );
      }
    }
  }, EARLY);
}
