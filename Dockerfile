FROM public.ecr.aws/lambda/nodejs:20 AS builder

WORKDIR "/app"
COPY . .
RUN npm i
RUN npm run build

FROM public.ecr.aws/lambda/nodejs:20 AS production
WORKDIR ${LAMBDA_TASK_ROOT}
ARG version

ENV VERSION=${version}

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/dist ./app
COPY --from=builder /app/node_modules ./node_modules
COPY views ./views
COPY public ./public

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "app/lambda.handler" ]  