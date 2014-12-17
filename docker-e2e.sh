#!/bin/bash

checkError() {
	rc=$?
	if [[ $rc != 0 ]] ; then
		echo $1 $rc
		exit $rc
	fi
}
# Fail on error
# set -e
# echo ${PIPESTATUS[0]}
# export PATH=$PATH:/usr/local/bin

echo Cleaning...
rm -rf ./dist

echo Install Bower components
bower install --no-color
checkError "Bower failed to install components"

echo Install NPM packages
npm install --no-color
checkError "NPM failed to install components"

unzip -o -q node_modules_patch/mongoose-migrate.zip -d node_modules
cd node_modules/.bin
ln -s ../mongoose-migrate/bin/migrate mongoose-migrate
cd ../..

echo Building app
grunt --no-color
checkError "Grunt build failed with exit code"

echo Copy Dockerfile to ./dist/
cp ./Dockerfile ./dist/

cd dist

echo NPM install developement
npm install

echo Building docker e2e image
docker build -t ragnarp12/tictactoe:e2e .
checkError "Docker image build failed with exit code "

echo "Done"
