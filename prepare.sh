#!/bin/bash
set -e

# export LAMBDA_TASK_ROOT=/var/task
# If version is development, then we don't want to increment the version
if [ $1 != "development" ]; then
  npm version $1 --no-git-tag-version
fi

REPO=$(cat .deployrc| jq .repo -r)
TAG=$1
# If version is development, then set the version as dev-<timestamp> in the format of YYYYMMDDHHMMSS
if [ $TAG == "development" ]; then
  export VERSION=dev-$(date +"%Y%m%d%H%M%S")
else
  export VERSION=$1
fi

if [ $TAG == "development" ]; then
  export DOCKERFILE_PATH=Dockerfile.development
else
  export DOCKERFILE_PATH=Dockerfile
fi

npm run build

# Docker build with custrom dockerfile name
echo Building image with version: $VERSION and tag: $TAG
echo -e "\tdocker build --no-cache --build-arg version=$VERSION -t $REPO:$TAG -f ./$DOCKERFILE_PATH ."
sudo docker build --no-cache --build-arg version=$VERSION -t $REPO:$TAG -f ./$DOCKERFILE_PATH .

echo "Image built successfully. TAG: $TAG"