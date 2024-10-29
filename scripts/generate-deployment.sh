#!/bin/sh

# set timezone
apk add --no-cache tzdata
cp /usr/share/zoneinfo/US/Central /etc/localtime
echo "US/Central" > /etc/timezone

# set up full dev workspace
corepack enable
yarn install

# generate prod build
yarn build --config ./tsconfig.build.json

# trim down image
yarn workspaces focus --production
rm -r src scripts .yarn .yarnrc.yml tsconfig.build.json tsconfig.json yarn.lock .git
