import { mkdirSync } from "fs";
import { defineConfig } from "drizzle-kit";

// Get database type from environment or default to sqlite
const databaseType = process.env.DATABASE_TYPE || "sqlite";

// Base configuration
const baseConfig = {
  schema: "./src/database/schemas/*.mts",
  verbose: true,
  strict: true,
};

// Resolve the SQLite database URL and ensure its directory exists
// Match the default used by @digital-alchemy/synapse: file:<cwd>/synapse_storage.db
const sqliteUrl = process.env.DATABASE_URL || "file:./synapse_storage.db";
if (databaseType === "sqlite") {
  // Strip the "file:" prefix to get the filesystem path, then ensure the directory exists
  const filePath = sqliteUrl.replace(/^file:/, "");
  const lastSlash = filePath.lastIndexOf("/");
  const dirPath = lastSlash > 0 ? filePath.slice(0, lastSlash) : ".";
  mkdirSync(dirPath, { recursive: true });
}

// Database-specific configurations
const configs = {
  sqlite: {
    ...baseConfig,
    dialect: "sqlite" as const,
    out: "./migrations/sqlite",
    dbCredentials: {
      url: sqliteUrl,
    },
  },
  postgresql: {
    ...baseConfig,
    dialect: "postgresql" as const,
    out: "./migrations/postgresql",
    dbCredentials: {
      url: process.env.DATABASE_URL || "postgresql://localhost:5432/synapse",
    },
  },
  mysql: {
    ...baseConfig,
    dialect: "mysql" as const,
    out: "./migrations/mysql",
    dbCredentials: {
      url: process.env.DATABASE_URL || "mysql://localhost:3306/synapse",
    },
  },
};

// Export the appropriate configuration based on DATABASE_TYPE
export default defineConfig(configs[databaseType as keyof typeof configs] || configs.sqlite);
