#!/bin/bash

#http://www.calazan.com/docker-cleanup-commands/
#
echo Kill running docker
docker kill $(docker ps -q)

echo Remove docker image
docker rm $(docker ps -a -q)

echo Pull docker image
docker pull ragnarp12/tictactoe

echo Run docker image
docker run -p 80:8080 -d -e "NODE_ENV=production" ragnarp12/tictactoe