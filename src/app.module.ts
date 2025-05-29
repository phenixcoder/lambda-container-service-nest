import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ApiController } from './api.controller';
import { AppService } from './app.service';
import { HealthService } from 'src/health/health.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development'],
    }),
  ],
  controllers: [AppController, ApiController],
  providers: [AppService, HealthService],
})
export class AppModule {}
