#!/bin/bash
REG=$(cat .deployrc| jq .registry -r)
REPO=$(cat .deployrc| jq .repo -r)
TAG=$1
echo "Publishing Image $REG/$REPO:$TAG"
docker tag $REPO:$TAG $REG/$REPO:$1
docker push $REG/$REPO:$1
docker tag $REPO:$TAG $REG/$REPO:latest
docker push $REG/$REPO:latest