import { NestFactory } from '@nestjs/core';
import { AppModule } from '@server/app.module';
import { AppRouter } from '@server/app.router';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.get(AppRouter).applyMiddleware(app);
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
