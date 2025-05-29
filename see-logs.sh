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

# get log groups using aws cli
# aws logs describe-log-groups --query 'logGroups[*].logGroupName' --output table

# display Cloudwatch logs tail for the environment using aws cli
aws logs tail /aws/lambda/service_microservice_starter_$1 --follow

