#!/bin/sh
set -e

echo "🔧 Code Glue startup..."

# Run database migrations using drizzle-kit
echo "📦 Running database migrations..."
cd /app/server
export DATABASE_URL="file:/app/synapse_storage.db"
npx drizzle-kit migrate

echo "✅ Migrations completed"

# Start the application
echo "🚀 Starting Code Glue server..."
exec tsx /app/server/app/environments/prebuilt/main.mjs
