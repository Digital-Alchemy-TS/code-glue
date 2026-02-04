#!/bin/sh
set -e

echo "🔧 Code Glue startup..."

cd /work

# Set database location for both migrations and application
export DATABASE_URL="file:/data/synapse_storage.db"

# Run database migrations using drizzle-kit
echo "📦 Running database migrations..."
(cd /work/apps/server && npx drizzle-kit migrate)

echo "✅ Migrations completed"

echo "🚀 Starting Code Glue server..."
exec node dist/server/app/environments/prebuilt/main.mjs
