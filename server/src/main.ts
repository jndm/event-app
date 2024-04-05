import { NestFactory } from '@nestjs/core';
import { AppModule } from '@server/app.module';
import { TrpcRouter } from '@server/trpc/trpc.router';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.get(TrpcRouter).applyMiddleware(app);
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
