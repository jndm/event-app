import { Module } from '@nestjs/common';
import { EventService } from './events.service';
import { EventRouter } from './events.router';
import { TrpcModule } from '@server/trpc/trpc.module';
import { CryptoService } from '@server/crypto.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TrpcModule],
  exports: [EventRouter],
  controllers: [],
  providers: [EventService, EventRouter, CryptoService, ConfigService],
})
export class EventsModule {}
