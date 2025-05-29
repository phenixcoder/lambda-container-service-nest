#!/bin/bash

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

aws lambda get-function-configuration --function-name service_microservice_starter_production | jq '.Environment.Variables | to_entries[] | "\(.key)=\(.value)"' -r > .env