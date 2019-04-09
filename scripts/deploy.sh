#!/bin/bash

# CREATOR Shlomi Levi <wizardnet972@gmail.com>

export $(grep -v '^#' .env | xargs -d '\n')

# docker build -t testapp -f .docker/Dockerfile-tera-admin

# npm run build:admin

npm run build:tera

node ./scripts/dep.js

docker-compose -f .docker/docker-compose.ecr.yml build

docker-compose -f .docker/docker-compose.ecr.yml push

# ecs-cli compose compose -f .docker/docker-compose.aws.yml --cluster ${ECS_CLUSTER} down


# docker build -t tera-admin ./tera-admin
# docker build -t tera-www ./tera-www
# docker build -t www-wizardnet972 ./www-wizardnet972

# docker tag tera-admin:latest 879624705037.dkr.ecr.us-east-2.amazonaws.com/tera-admin:latest
# docker tag tera-www:latest 879624705037.dkr.ecr.us-east-2.amazonaws.com/tera-www:latest
# docker tag www-wizardnet972:latest 879624705037.dkr.ecr.us-east-2.amazonaws.com/www-wizardnet972:latest

# docker push 879624705037.dkr.ecr.us-east-2.amazonaws.com/tera-admin:latest
# docker push 879624705037.dkr.ecr.us-east-2.amazonaws.com/tera-www:latest
# docker push 879624705037.dkr.ecr.us-east-2.amazonaws.com/www-wizardnet972:latest

# dos2unix www-wizardnet972/entrypoint.sh

# ecs-cli compose compose -f .docker/docker-compose.aws.yml --cluster ${ECS_CLUSTER} up

