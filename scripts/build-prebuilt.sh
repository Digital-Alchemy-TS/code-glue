#!/usr/bin/env bash
set -euo pipefail

# Build the prebuilt container image
# This script is designed to work from within the Home Assistant dev container

echo "🔨 Building prebuilt Code Glue container..."
echo "ℹ️  This builds both client and server at Docker build time (no runtime building)"

# Clean up any existing containers
docker rm -f code-glue-addon-dev 2>/dev/null || true

# Build the image
docker buildx build --load -t code-glue-addon:dev .

echo ""
echo "✅ Build complete! Container tagged as: code-glue-addon:dev"
echo ""
echo "Next steps:"
echo "  • Test with: ./scripts/dev/test-prebuilt.sh"
echo "  • Run with: ./scripts/dev/run-prebuilt.sh"
echo ""