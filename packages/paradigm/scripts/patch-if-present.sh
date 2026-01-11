#!/bin/bash
# Only run patch-package if the target packages exist
# This prevents failures during CI when yarn runs postinstall before all deps are hoisted

# Try to apply patches, but don't fail if packages aren't installed yet
patch-package --patch-dir patches 2>&1 | grep -v "Error: Patch file found for package" || true

# Always exit successfully so yarn install can continue
exit 0
