#!/bin/bash

# Script to fetch ingress URL from Home Assistant Supervisor and inject into client code
# This runs during Docker build when the addon is being installed

echo "Fetching ingress URL from Home Assistant Supervisor..."

# Check if we're in a Home Assistant environment
if [ -z "$SUPERVISOR_TOKEN" ]; then
    echo "SUPERVISOR_TOKEN not found - assuming development environment"
    echo "Using localhost baseUrl"
    exit 0
fi

# Fetch addon list from supervisor
ADDONS_RESPONSE=$(curl -s -H "Authorization: Bearer $SUPERVISOR_TOKEN" \
    -H "Content-Type: application/json" \
    http://supervisor/addons)

if [ $? -ne 0 ]; then
    echo "Failed to fetch addons from supervisor - using localhost baseUrl"
    exit 0
fi

# Extract Code Glue addon slug
ADDON_SLUG=$(echo "$ADDONS_RESPONSE" | jq -r '.data.addons[] | select(.name == "Code Glue") | .slug')

if [ "$ADDON_SLUG" = "null" ] || [ -z "$ADDON_SLUG" ]; then
    echo "Code Glue addon not found - using localhost baseUrl"
    exit 0
fi

echo "Found Code Glue addon with slug: $ADDON_SLUG"

# Fetch addon info to get ingress URL
ADDON_INFO_RESPONSE=$(curl -s -H "Authorization: Bearer $SUPERVISOR_TOKEN" \
    -H "Content-Type: application/json" \
    "http://supervisor/addons/$ADDON_SLUG/info")

if [ $? -ne 0 ]; then
    echo "Failed to fetch addon info - using localhost baseUrl"
    exit 0
fi

# Extract ingress URL
INGRESS_URL=$(echo "$ADDON_INFO_RESPONSE" | jq -r '.data.ingress_url')

if [ "$INGRESS_URL" = "null" ] || [ -z "$INGRESS_URL" ]; then
    echo "Ingress URL not found - using localhost baseUrl"
    exit 0
fi

echo "Found ingress URL: $INGRESS_URL"

# Extract path from ingress URL
INGRESS_PATH=$(echo "$INGRESS_URL" | sed 's|https\?://[^/]*||' | sed 's|/$||')

if [ -z "$INGRESS_PATH" ]; then
    INGRESS_PATH=""
fi

echo "Extracted ingress path: $INGRESS_PATH"

# Export as environment variable for the build process
export EXPO_PUBLIC_INGRESS_PATH="$INGRESS_PATH"
echo "Exported EXPO_PUBLIC_INGRESS_PATH=$INGRESS_PATH for build process"

# Update app.json to use ingress path for static assets
APP_JSON_PATH="./apps/client/app.json"
if [ -f "$APP_JSON_PATH" ]; then
    echo "Updating app.json baseUrl to: $INGRESS_PATH"
    
    # Create a temporary file with the updated baseUrl
    jq --arg ingress_path "$INGRESS_PATH" '
        .expo.experiments.baseUrl = $ingress_path
    ' "$APP_JSON_PATH" > "$APP_JSON_PATH.tmp"
    
    # Replace the original file
    mv "$APP_JSON_PATH.tmp" "$APP_JSON_PATH"
    
    echo "Updated app.json with ingress baseUrl"
else
    echo "Warning: app.json not found at $APP_JSON_PATH"
fi
