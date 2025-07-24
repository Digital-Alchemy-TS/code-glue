#!/bin/sh

# Post-build script to convert absolute asset paths to relative paths
# for Home Assistant ingress compatibility

set -e

DIST_DIR="./dist/client"

if [ ! -d "$DIST_DIR" ]; then
    echo "❌ Directory $DIST_DIR not found"
    exit 1
fi

echo "🔧 Converting absolute asset paths to relative paths..."
echo "Working in directory: $DIST_DIR"

# Only process HTML files to avoid breaking JavaScript/CSS syntax
find "$DIST_DIR" -type f -name "*.html" | while read -r file; do
    echo "Processing: `basename "$file"`"
    
    # Create temporary file for in-place editing
    temp_file=`mktemp`
    
    # Use more targeted sed patterns to avoid breaking JS/CSS code
    sed \
        -e 's|\(<link[^>]*href="\)/assets/|\1./assets/|g' \
        -e 's|\(<link[^>]*href="\)/_expo/|\1./_expo/|g' \
        -e 's|\(<script[^>]*src="\)/_expo/|\1./_expo/|g' \
        -e 's|\(<link[^>]*href="\)/favicon\.ico|\1./favicon.ico|g' \
        -e 's|\(@font-face[^}]*src:[[:space:]]*url(\)/assets/|\1./assets/|g' \
        "$file" > "$temp_file"
    
    # Check if file was actually modified
    if ! cmp -s "$file" "$temp_file"; then
        mv "$temp_file" "$file"
        echo "  ✓ Updated `basename "$file"`"
    else
        rm "$temp_file"
        echo "  - No changes needed for `basename "$file"`"
    fi
done

echo "✅ Asset path conversion completed!"
