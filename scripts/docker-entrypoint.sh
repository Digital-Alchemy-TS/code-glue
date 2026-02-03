#!/bin/sh
set -e

echo "🔧 Code Glue startup..."

cd /work

# Run database migrations using drizzle-kit
echo "📦 Running database migrations..."
(cd /work/apps/server && export DATABASE_URL="file:/data/synapse_storage.db" && npx drizzle-kit migrate)

echo "✅ Migrations completed"

echo "🚀 Starting Code Glue server..."
exec node dist/server/app/environments/prebuilt/main.mjs
