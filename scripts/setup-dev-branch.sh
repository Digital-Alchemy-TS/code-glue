#!/bin/bash
set -e

echo "🔧 Setting up dev branch..."

# Check if we're on main/another branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" = "dev" ]; then
    echo "❌ Already on dev branch. Switch to another branch first."
    exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  You have uncommitted changes. Please commit or stash them first."
    exit 1
fi

# Create dev branch from current branch
echo "📝 Creating dev branch..."
git checkout -b dev 2>/dev/null || git checkout dev

# Replace config.yaml with config-dev.yaml
echo "📋 Setting up dev configuration..."
cp config-dev.yaml config.yaml

# Commit the change
git add config.yaml
git commit -m "Use dev configuration for dev branch" || echo "No changes to commit"

echo "✅ Dev branch ready!"
echo ""
echo "Next steps:"
echo "1. Push dev branch: git push -u origin dev"
echo ""
echo "2. In Home Assistant, add this repository URL:"
echo "   https://github.com/Digital-Alchemy-TS/code-glue"
echo ""
echo "3. Install 'Code Glue (Dev)' addon - it will:"
echo "   - Use the 'dev' branch code"
echo "   - Have slug 'code_glue_dev' (separate from production)"
echo "   - Use its own database in /data"
echo "   - Pull image from ghcr.io/digital-alchemy-ts/code-glue:dev"
echo ""
echo "To make changes:"
echo "1. Make changes on dev branch"
echo "2. Commit and push to dev"
echo "3. GitHub Actions will build and push the :dev image"
echo "4. Restart the addon in HA to pull the new image"
