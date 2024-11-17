import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { applyGlobalPipes } from './config/global-pipes.config.ts';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);
  applyGlobalPipes(app);
  await app.listen(3000);
}
bootstrap();
