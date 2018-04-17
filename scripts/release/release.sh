#!/bin/bash

set -e

echo ""
echo "RELEASE"
echo ""

# Go to project dir
cd $(dirname $0)/../..

git checkout master; git pull origin master
npm run build
standard-version

CURRENT_VERSION=$(node -p "require('./package.json').version")
cd dist/ngx-mime

echo "Version: $CURRENT_VERSION"
npm version $CURRENT_VERSION

cd ../..
git push --follow-tags origin master; npm publish dist/ngx-mime
