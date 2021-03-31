#!/bin/bash

set -e

echo ""
echo "RELEASE"
echo ""

# Go to project dir
cd $(dirname $0)/../..

git checkout master; git pull origin master
yarn build:libs
yarn build:elements

CURRENT_VERSION=$(node -p "require('./package.json').version")
cd dist/libs/@nationallibraryofnorway/ngx-mime
cp ../../../../README.md .

echo "Version: $CURRENT_VERSION"
npm version $CURRENT_VERSION

cd ../../../..

git add -f dist && standard-version -a
git push --follow-tags origin master
npm publish dist/libs/@nationallibraryofnorway/ngx-mime
