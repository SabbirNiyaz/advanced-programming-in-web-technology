import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const user = await NestFactory.create(AppModule);
  await user.listen(process.env.PORT || 3000);
}
bootstrap();
