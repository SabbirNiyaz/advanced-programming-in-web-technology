import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // First, create the Nest app
  const app = await NestFactory.create(AppModule);

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties not in DTO
      forbidNonWhitelisted: true, // throws error if extra properties exist
      transform: true, // automatically converts payload to DTO instance
      forbidUnknownValues: true, // prevent unknown objects
      validationError: { target: false }, // optional: remove the object from error response
    }),
  );

  // Listen on PORT from env or default 3000
  await app.listen(process.env.PORT || 3000);
}

bootstrap();