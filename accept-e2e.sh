#!/bin/bash

export PATH=$PATH:/usr/local/bin
export DISPLAY=:99

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
rc=$?
if [[ $rc != 0 ]] ; then
echo "Bower failed to install components " $rc
exit $rc
fi


echo "Install NPM packages"
npm install --no-color

rc=$?
if [[ $rc != 0 ]] ; then
echo "NPM failed to install components " $rc
exit $rc
fi

echo "Run web driver update"
node node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager update

/usr/bin/Xvfb :99 -ac -screen 0 1024x768x8 &

echo "Run E2E tests"
xvfb-run grunt test:e2e
rc=$?
if [[ $rc != 0 ]] ; then
echo "Grunt E2E tests failed " $rc
exit $rc
fi

killall Xvfb

echo "Done"