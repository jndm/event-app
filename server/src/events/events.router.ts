import { Injectable } from '@nestjs/common';
import { eventCreateSchema } from '@server/events/schemas/event.schema';
import { TrpcService } from '@server/trpc/trpc.service';
import { EventService } from './events.service';

@Injectable()
export class EventRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly eventService: EventService,
  ) {}

  router = this.trpcService.router({
    get_all: this.trpcService.procedure.query(() => {
      return this.eventService.getEvents();
    }),

    add: this.trpcService.procedure
      .input({ ...eventCreateSchema })
      .mutation(({ input }) => {
        return this.eventService.addEvent(input);
      }),
  });
}
