import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app
  .enableVersioning({
    type:VersioningType.URI
  })
  .useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform:true
  }))
  await app.listen(3000);
}
bootstrap();
