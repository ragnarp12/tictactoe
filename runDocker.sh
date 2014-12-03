#!/bin/bash

set -e

PRODUCTION_SERVER="188.226.210.128"

echo Connect to Production server and run docker image
ssh root@$PRODUCTION_SERVER 'bash -s' < dockerserver.sh