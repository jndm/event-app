import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppRouter } from './app.router';
import { TestModule } from './test/test.module';
import { EventsModule } from './events/events.module';
import { TrpcModule } from './trpc/trpc.module';
import { KyselyModule } from './database/kysely.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    KyselyModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.get('POSTGRES_HOST')!,
        port: parseInt(configService.get('POSTGRES_PORT')!, 10),
        user: configService.get('POSTGRES_USER')!,
        password: configService.get('POSTGRES_PASSWORD')!,
        database: configService.get('POSTGRES_DB')!,
      }),
    }),
    TrpcModule,
    TestModule,
    EventsModule,
  ],
  controllers: [],
  providers: [AppRouter],
})
export class AppModule {}
