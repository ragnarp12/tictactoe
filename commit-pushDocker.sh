#!/bin/bash

checkError() {
	rc=$?
	if [[ $rc != 0 ]] ; then
		echo $1 $rc
		exit $rc
	fi
}

echo "Push docker image to the Docker server"
docker push ragnarp12/tictactoe
checkError "Docker failed to push image"

echo "Done"