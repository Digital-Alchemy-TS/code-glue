#!/bin/sh
NODE_OPTIONS="$NODE_OPTIONS --experimental-vm-modules" npx jest --config jest.config.js --pass-with-no-tests --runInBand "$1" || exit 1