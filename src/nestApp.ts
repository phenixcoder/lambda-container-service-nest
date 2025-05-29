import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { create } from 'express-handlebars';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

export async function NestAppInit(nestApp: NestExpressApplication) {
  nestApp.useGlobalPipes(new ValidationPipe());

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Microservice Template API')
    .setDescription('NestJS Microservice Template with Swagger documentation')
    .setVersion('1.0')
    .addTag('health', 'Health check endpoints')
    .addTag('sample', 'Sample CRUD operations')
    .addTag('demo', 'Demo pages and forms')
    .build();

  const document = SwaggerModule.createDocument(nestApp, config);
  SwaggerModule.setup('api', nestApp, document);

  nestApp.useStaticAssets(join(__dirname, '..', 'public'));
  nestApp.setBaseViewsDir(join(__dirname, '..', 'views'));
  nestApp.engine(
    'hbs',
    create({
      extname: '.hbs',
      partialsDir: join(__dirname, '..', 'views', 'partials'),
    }).engine,
  );
  nestApp.setViewEngine('hbs');

  nestApp.enableCors();

  return await nestApp.init();
}
