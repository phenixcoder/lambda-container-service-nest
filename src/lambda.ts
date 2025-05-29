import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { Context, Handler } from 'aws-lambda';
import * as express from 'express';

import { AppModule } from './app.module';
import * as serverlessHttp from 'serverless-http';
import { NestAppInit } from './nestApp';

let cachedServer: Handler;

async function bootstrap() {
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create<NestExpressApplication>(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    NestAppInit(nestApp);

    cachedServer = serverlessHttp(expressApp);
  }

  return cachedServer;
}

export const handler = async (event: any, context: Context, callback: any) => {
  const server = await bootstrap();
  return server(event, context, callback);
};
