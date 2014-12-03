#!/bin/bash

set -e

PRODUCTION_SERVER="188.226.210.128"

echo Connect to Production server and run docker image
ssh -o ConnectTimeout=10 root@$PRODUCTION_SERVER 'bash -s' < dockerserver.sh