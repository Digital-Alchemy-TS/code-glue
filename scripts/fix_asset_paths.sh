#!/bin/bash

# Post-build script to convert absolute asset paths to relative paths
# for Home Assistant ingress compatibility

set -e

DIST_DIR="./dist/client"

if [ ! -d "$DIST_DIR" ]; then
    echo "Error: Distribution directory $DIST_DIR not found"
    echo "Make sure to run this script from the project root after building"
    exit 1
fi

echo "🔧 Converting absolute asset paths to relative paths..."
echo "Working in directory: $DIST_DIR"

# Find all HTML, CSS, and JS files in the dist directory
find "$DIST_DIR" -type f \( -name "*.html" -o -name "*.css" -o -name "*.js" -o -name "*.json" \) | while read -r file; do
    echo "Processing: $(basename "$file")"
    
    # Create temporary file for in-place editing
    temp_file=$(mktemp)
    
    # Convert absolute paths to relative paths
    # This covers various asset path patterns:
    # - /assets/... -> ./assets/...
    # - /_expo/... -> ./_expo/...
    # - /favicon.ico -> ./favicon.ico
    # - /__node_modules/... -> ./__node_modules/...
    # - Any other absolute paths starting with / (except protocol://)
    
    sed -E '
        # Convert src="/..." to src="./..."
        s|src="/([^"]*)|src="./\1|g
        # Convert href="/..." to href="./..." 
        s|href="/([^"]*)|href="./\1|g
        # Convert url(/...) to url(./...)
        s|url\(/([^)]*)\)|url(./\1)|g
        # Convert url("/...") to url("./...")
        s|url\("/([^"]*)"\)|url("./\1")|g
        # Convert url('\'''/...'\''') to url('\''./...'\''')
        s|url\('\'''/([^'\'']*)'\'\''\)|url('\''./\1'\'')|g
        # Convert standalone "/..." paths in quotes (for import statements, etc.)
        s|"(/[^"]*\.(css|js|ttf|woff|woff2|eot|svg|png|jpg|jpeg|gif|webp|ico|json))"|".\1"|g
        # Convert standalone '\''/...'\'' paths in single quotes
        s|'\''(/[^'\'']*\.(css|js|ttf|woff|woff2|eot|svg|png|jpg|jpeg|gif|webp|ico|json))'\'\'|'\''.\1'\''|g
        # Handle JSON-style paths (escaped quotes)
        s|\\"(/[^\\]*\\.(css|js|ttf|woff|woff2|eot|svg|png|jpg|jpeg|gif|webp|ico|json))\\"|\\".\\1\\"|g
    ' "$file" > "$temp_file"
    
    # Only update the file if changes were made
    if ! cmp -s "$file" "$temp_file"; then
        mv "$temp_file" "$file"
        echo "  ✓ Updated $(basename "$file")"
    else
        rm "$temp_file"
        echo "  - No changes needed for $(basename "$file")"
    fi
done

echo ""
echo "🎉 Asset path conversion complete!"
echo ""
