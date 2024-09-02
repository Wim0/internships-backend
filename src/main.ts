import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('Starting server 🚀... ');
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('Server started at http://localhost:3000 🦄');
}
bootstrap();
