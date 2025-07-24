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

# Find all HTML, CSS, and JS files in the dist directory
find "$DIST_DIR" -type f \( -name "*.html" -o -name "*.css" -o -name "*.js" -o -name "*.json" \) | while read -r file; do
    echo "Processing: `basename "$file"`"
    
    # Create temporary file for in-place editing
    temp_file=`mktemp`
    
    # Convert absolute paths to relative paths using multiple simple sed commands
    sed \
        -e 's|src="/|src="./|g' \
        -e 's|href="/|href="./|g' \
        -e 's|url(/|url(./|g' \
        -e 's|url("/|url("./|g' \
        -e "s|url('/|url('./|g" \
        -e 's|"/assets/|"./assets/|g' \
        -e 's|"/_expo/|"./_expo/|g' \
        -e "s|'/assets/|'./assets/|g" \
        -e "s|'/_expo/|'./_expo/|g" \
        -e 's|\\"\/|\\".\\/|g' \
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
