import { INestApplication, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@src/app';
import { configureSwagger } from '@config/swagger';

async function bootstrap() {
  const app: INestApplication<AppModule> = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix(process.env.API_PREFIX!);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  configureSwagger(app);
  await app.listen(+process.env.PORT!);
}

bootstrap();
