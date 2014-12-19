#!/bin/bash
export PATH=$PATH:/usr/local/bin

# Fail on error
# set -e
# echo ${PIPESTATUS[0]}
# export PATH=$PATH:/usr/local/bin

echo "Cleaning..."
rm -rf ./dist

echo "Install Bower components"
bower install --no-color
rc=$?
if [ $rc != 0 ]; then
	echo "Bower failed to install components " $rc
	exit $rc
fi

echo "Install NPM packages"
npm install --no-color

rc=$?
if [ $rc != 0 ]; then
	echo "NPM failed to install components " $rc
	exit $rc
fi

# This is supposed to be moved closer to dock build
#unzip -o -q node_modules_patch/mongoose-migrate.zip -d node_modules
#kdir node_modules/.bin
#cd node_modules/.bin
#ln -s ../mongoose-migrate/bin/migrate mongoose-migrate
#cd ../..

echo "Building app"
grunt --no-color
rc=$?
if [ $rc != 0 ]; then
	echo "Grunt build failed with exit code " $rc
	exit $rc
fi

echo "Copy Dockerfile to ./dist/"
cp ./Dockerfile ./dist/

cd dist

echo "NPM install production"
npm install --production 
rc=$?
if [ $rc != 0 ]; then
	echo "NPM install production " $rc
	exit $rc
fi

echo Building docker image
docker build -t ragnarp12/tictactoe .
rc=$?
if [ $rc != 0 ]; then
	echo "Docker image build failed with exit code " $rc
	exit $rc
fi

echo "Done"
