#!/bin/bash

export REPO_NAME="your-microservice-name"
export REPO_URI="YOUR_AWS_ACCOUNT_ID.dkr.ecr.YOUR_REGION.amazonaws.com/your-microservice-name"
export REPO_REGISTRY="YOUR_AWS_ACCOUNT_ID.dkr.ecr.YOUR_REGION.amazonaws.com"
export SKIP_VERSION="true"

# Exit on error
set -e

# check if environment is passed as parameter

if [ -z "$1" ]
  then
    echo "No environment supplied"
    exit 1
fi

# check if environment is valid. valid environments are production, beta.

if [ "$1" != "production" ] && [ "$1" != "beta" ]
  then
    echo "Invalid environment supplied"
    exit 1
fi

# check if image tag is passed as argument
if [ -z "$2" ]
  then
    echo "No image tag supplied"
    echo "using : development"
    TAG="development"
  else
    echo "using image tag: $2"
    TAG=$2
fi

FUNCTION_NAME=$(aws ssm get-parameter --name /your-company/$1/your-service/lambda --query 'Parameter.Value' --output text)
echo -e "Deploying Image \n$REPO_URI [ $TAG ] \nto $FUNCTION_NAME"
aws lambda update-function-code --function-name $FUNCTION_NAME --image-uri $REPO_URI:$TAG --publish
