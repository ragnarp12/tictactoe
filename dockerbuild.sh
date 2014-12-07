#!/bin/bash

# Fail on error
set -e
# echo ${PIPESTATUS[0]}
# export PATH=$PATH:/usr/local/bin

echo Cleaning...
rm -rf ./dist

echo Install Bower components
bower install --no-color

echo Install NPM packages
npm install --no-color

echo Building app
grunt --no-color

echo Copy Dockerfile to ./dist/
cp ./Dockerfile ./dist/

cd dist

echo NPM install production
npm install --production 

echo Building docker image
docker build -t ragnarp12/tictactoe .

echo "Done"
