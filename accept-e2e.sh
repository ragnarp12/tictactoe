#!/bin/bash

export PATH=$PATH:/usr/local/bin
export DISPLAY=:10

checkError() {
	rc=$?
	if [[ $rc != 0 ]] ; then
		echo $1 $rc
		exit $rc
	fi
}

echo "Check if xvfb-run is installed"
if ! which xvfb-run > /dev/null; then
	echo "Installing"
	apt-get install xvfb
	echo "Installed"
else
	echo "Xvfb is installed"
fi

echo "Cleaning..."
rm -rf ./dist

echo "Install Bower components"
bower install --no-color
checkError "Bower failed to install components"

echo "Install NPM packages"
npm install --no-color
checkError "NPM failed to install components"

echo "Run web driver update"
node node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager update

echo "Run E2E tests"
xvfb-run grunt test:e2e
checkError "Grunt E2E tests failed"

echo "Done"