import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppRouter } from './app.router';
import { TestModule } from './test/test.module';
import { EventsModule } from './events/events.module';
import { TrpcModule } from './trpc/trpc.module';

@Module({
  imports: [ConfigModule.forRoot(), TrpcModule, TestModule, EventsModule],
  controllers: [],
  providers: [AppRouter],
})
export class AppModule {}
