#!/bin/bash

export REPO_NAME="your-microservice-name"
export REPO_URI="YOUR_AWS_ACCOUNT_ID.dkr.ecr.YOUR_REGION.amazonaws.com/your-microservice-name"
export REPO_REGISTRY="YOUR_AWS_ACCOUNT_ID.dkr.ecr.YOUR_REGION.amazonaws.com"
export SKIP_VERSION="true"

function build_image() {
  echo "Building image"
  IMG_TAG=$1
  ./prepare.sh $IMG_TAG

  if [ $TAG == "development" ]; then
    echo "Skipping publish"
    exit 0
  fi
  aws ecr get-login-password --region ap-southeast-2 | sudo docker login --username AWS --password-stdin $REPO_REGISTRY
  ./publish.sh $IMG_TAG
}

# check if image tag is passed as argument
if [ -z "$1" ]
  then
    echo "No image tag supplied"
    echo "using : development"
    TAG="development"
    build_image $TAG
  else
    echo "using image tag: $1"
    TAG=$1

    # Cehck if --build is passed as argument
    if [ "$2" == "--build" ]
    then
      echo "Building image. Tag: $TAG"
      build_image $TAG
    fi
fi

if [ $TAG == "development" ]; then
  echo "Skipping deployment"
  exit 0
fi

REG=$(cat .deployrc| jq .registry -r)
REPO=$(cat .deployrc| jq .repo -r)

TFC_WORKSPACE=$(cat .deployrc| jq .environments.beta -r) 
FUNCTION_NAME=$(TFC_WORKSPACE=$TFC_WORKSPACE tfc output get | jq ".services | .[] | select(.name == \"microservice-starter\")" -r | jq .lambda_arn -r)
echo -e "Deploying Image \n$REG\n$REPO [ $TAG ] \nto $FUNCTION_NAME"
echo "aws lambda update-function-code --function-name $FUNCTION_NAME --image-uri $REG/$REPO:$TAG --publish"

