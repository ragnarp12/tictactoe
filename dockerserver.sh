#!/bin/bash

#http://www.calazan.com/docker-cleanup-commands/
#
echo Kill running docker
docker kill tictactoe

echo Remove docker image
docker rm tictactoe

echo Pull docker image
docker pull ragnarp12/tictactoe

echo Run docker image
docker run -p 80:8080 -d -e "NODE_ENV=production" --name=tictactoe ragnarp12/tictactoe