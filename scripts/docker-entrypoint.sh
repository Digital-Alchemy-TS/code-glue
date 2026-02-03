#!/bin/sh
set -e

echo "🔧 Code Glue startup..."

cd /work

# Ensure /data directory exists and is writable
echo "Checking /data directory..."
if [ ! -d /data ]; then
  echo "Creating /data directory..."
  mkdir -p /data || echo "Warning: Could not create /data directory"
fi

# Check if /data is writable
if [ -w /data ]; then
  echo "✓ /data directory is writable"
else
  echo "✗ /data directory is not writable by current user ($(whoami))"
  ls -ld /data
fi

# Run database migrations using drizzle-kit
echo "📦 Running database migrations..."
(cd /work/apps/server && export DATABASE_URL="file:/data/synapse_storage.db" && npx drizzle-kit migrate)

echo "✅ Migrations completed"

echo "🚀 Starting Code Glue server..."
exec node dist/server/app/environments/prebuilt/main.mjs
