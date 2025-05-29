#/bin/sh

# This is the entrypont for nodejs docker image. If DOCKER env is set to true, then it will run the main.js file else it will run the lambda.js file
if [ "$DOCKER" == "true" ]; then
  node main.js
else
  /usr/local/bin/npx aws-lambda-ric node lambda.handler
fi