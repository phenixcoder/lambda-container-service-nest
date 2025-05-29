import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { NestAppInit } from './nestApp';
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 4100;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  NestAppInit(app);
  // app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.engine(
  //   'hbs',
  //   create({
  //     extname: '.hbs',
  //     partialsDir: join(__dirname, '..', 'views', 'partials'),
  //   }).engine,
  // );
  // app.setViewEngine('hbs');

  await app.listen(PORT).then(() => {
    console.log('Server is running on http://localhost:' + PORT);
    console.log('Press CTRL + C to stop the server');
  });
}
bootstrap();
