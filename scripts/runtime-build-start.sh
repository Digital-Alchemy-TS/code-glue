#!/bin/bash

echo "=== Code Glue Runtime Build ==="
echo "Starting runtime build with ingress detection..."

# Load .env file if it exists
if [ -f ".env" ]; then
    echo "📄 Loading .env file..."
    export $(grep -v '^#' .env | xargs)
fi


# Files to track build state
BUILD_INFO_FILE="./.runtime-build-info"
BUILD_DIST_DIR="./dist"
CURRENT_INGRESS_PATH=""

# Function to check if build exists and is current
check_existing_build() {
    # Check if dist directory exists
    if [ ! -d "$BUILD_DIST_DIR" ]; then
        echo "📁 No existing build found - dist directory missing"
        return 1
    fi


    # Read previous build info
    PREV_INGRESS_PATH=$(cat "$BUILD_INFO_FILE" 2>/dev/null || echo "")

    echo "📋 Previous build ingress path: '$PREV_INGRESS_PATH'"
    echo "📋 Current ingress path: '$CURRENT_INGRESS_PATH'"

    # Compare ingress paths
    if [ "$PREV_INGRESS_PATH" != "$CURRENT_INGRESS_PATH" ]; then
        echo "❌ Ingress path changed - rebuild needed"
        return 1
    fi

    echo "✅ Build appears current - skipping rebuild"
    return 0
}

# Function to save build info
save_build_info() {
    echo "$CURRENT_INGRESS_PATH" > "$BUILD_INFO_FILE"
    echo "💾 Saved build info with ingress path: '$CURRENT_INGRESS_PATH'"
}

# Function to fetch and apply ingress path
setup_ingress() {
    if [ -n "$SUPERVISOR_TOKEN" ]; then
        echo "📡 Fetching ingress path from Home Assistant Supervisor..."

        # Fetch this addon's info directly (more secure than listing all addons)
        ADDON_INFO_RESPONSE=$(wget -qO- --header="Authorization: Bearer $SUPERVISOR_TOKEN" \
            --header="Content-Type: application/json" \
            http://supervisor/addons/self/info 2>/dev/null)

        if [ $? -eq 0 ] && [ -n "$ADDON_INFO_RESPONSE" ]; then
            echo "✅ Successfully fetched addon info"

            # Extract ingress URL directly
            INGRESS_URL=$(echo "$ADDON_INFO_RESPONSE" | jq -r '.data.ingress_url')

            if [ "$INGRESS_URL" != "null" ] && [ -n "$INGRESS_URL" ]; then
                # Extract path from ingress URL (remove trailing slash)
                INGRESS_PATH=$(echo "$INGRESS_URL" | sed 's|https\?://[^/]*||' | sed 's|/$||')

                echo "🎯 Found ingress URL: $INGRESS_URL"
                echo "📍 Extracted ingress path: $INGRESS_PATH"

                # Update app.json to use ingress path for static assets
                APP_JSON_PATH="./apps/client/app.json"
                if [ -f "$APP_JSON_PATH" ]; then
                    echo "📝 Updating app.json with ingress baseUrl..."

                    # Create updated app.json with correct baseUrl
                    jq --arg ingress_path "$INGRESS_PATH" \
                        '.expo.experiments.baseUrl = $ingress_path' \
                        "$APP_JSON_PATH" > "$APP_JSON_PATH.tmp"

                    # Replace the original file
                    mv "$APP_JSON_PATH.tmp" "$APP_JSON_PATH"

                    echo "✅ Updated app.json with baseUrl: $INGRESS_PATH"

                    # Export for the proxy to use (though proxy auto-detects now)
                    export INGRESS_PATH="$INGRESS_PATH"

                    # Set current ingress path for build caching
                    CURRENT_INGRESS_PATH="$INGRESS_PATH"

                    return 0
                else
                    echo "❌ Warning: app.json not found at $APP_JSON_PATH"
                fi
            else
                echo "❌ No ingress URL found in addon info"
            fi
        else
            echo "❌ Failed to fetch addon info from supervisor"
        fi
    else
        echo "🔧 No SUPERVISOR_TOKEN found - assuming development environment"
    fi

    echo "⚠️  No ingress path configured - using default relative paths"
    return 1
}

# Step 1: Setup ingress configuration
echo ""
echo "Step 1: Configuring ingress settings..."
setup_ingress

# Step 2: Check if we need to build
echo ""
echo "Step 2: Checking if build is needed..."

if [ "$DEVELOPMENT_MODE" = "true" ]; then
    echo "🔧 Development environment confirmed - skipping build process"
    echo "💡 In development mode, run 'yarn client:dev' from the dev container" 

    echo "🚀 Starting development server..."
    exec yarn server:start
elif ! check_existing_build; then
    echo "🔨 Building client and server applications..."
    echo "⚡ Running: yarn build"


    echo "❌ SHOULD NOT BE BUILDING"
    # if ! yarn build; then
    #     echo "❌ Build failed!"
    #     exit 1
    # fi

    # echo "✅ Build completed successfully!"

    # Save build info
    save_build_info
else
    echo "⏭️  Skipping build - using existing build"
fi

# Step 3: Start the services
echo ""
echo "Step 3: Starting application services..."
echo "🚀 Starting Code Glue..."

# Start the normal application
exec node dist/server/start-with-proxy.mjs
