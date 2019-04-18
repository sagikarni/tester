#!/bin/bash

# CREATOR Shlomi Levi <wizardnet972@gmail.com>

export $(grep -v '^#' .env | xargs -d '\n')

# args
POSITIONAL=()
while [[ $# -gt 0 ]]
do
key="$1"

case $key in
    -t|--target)
    TARGET="$2"
    shift # past argument
    shift # past value
    ;;
esac
done
set -- "${POSITIONAL[@]}" # restore positional parameters

aws ecr get-login --no-include-email | sh -

if [ -z "$TARGET" ]; then
    echo "build all"
    npm run build:admin
    npm run build:tera
    node ./scripts/dep.js
    docker-compose -f .docker/docker-compose.ecr.yml build
    docker-compose -f .docker/docker-compose.ecr.yml push

    echo "deploy complete"

    exit
fi

if [ "$TARGET" = "admin" ]; then
    npm run build:admin
fi

if [ "$TARGET" = "tera" ]; then
    npm run build:tera
fi

node ./scripts/dep.js

if [ "$TARGET" = "admin" ]; then
    docker-compose -f .docker/docker-compose.ecr.yml build tera-admin
fi

if [ "$TARGET" = "tera" ]; then
    docker-compose -f .docker/docker-compose.ecr.yml build tera-www
fi

docker-compose -f .docker/docker-compose.ecr.yml push

echo "deploy complete"

