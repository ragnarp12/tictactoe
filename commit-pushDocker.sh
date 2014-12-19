#!/bin/bash

echo "Push docker image to the Docker server"
docker push ragnarp12/tictactoe
rc=$?
if [[ $rc != 0 ]] ; then
echo "Docker failed to push image" $rc
exit $rc
fi

echo "Done"