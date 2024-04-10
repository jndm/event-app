import { Module } from '@nestjs/common';
import { EventService } from './events.service';
import { EventRouter } from './events.router';
import { TrpcModule } from '@server/trpc/trpc.module';

@Module({
  imports: [TrpcModule],
  exports: [EventRouter],
  controllers: [],
  providers: [EventService, EventRouter],
})
export class EventsModule {}
