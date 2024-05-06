import { Injectable } from '@nestjs/common';
import {
  Event,
  eventCreateSchema,
  eventDeleteSchema,
  eventUpdateSchema,
} from '@server/events/schemas/event.schema';
import { TrpcService } from '@server/trpc/trpc.service';
import { EventService } from './events.service';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

@Injectable()
export class EventRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly eventService: EventService,
  ) {}

  router = this.trpcService.router({
    getAll: this.trpcService.procedure //
      .query(async (): Promise<Event[]> => {
        return await this.eventService.getEvents();
      }),

    get: this.trpcService.procedure
      .input(z.number())
      .query(async ({ input }): Promise<Event> => {
        return await this.eventService.getEvent(input);
      }),

    add: this.trpcService.procedure
      .input({ ...eventCreateSchema })
      .mutation(async ({ input }) => {
        return await this.eventService.addEvent(input);
      }),

    delete: this.trpcService.procedure
      .input({ ...eventDeleteSchema })
      .mutation(async ({ input }) => {
        return await this.eventService.deleteEvent(input.eventId);
      }),

    update: this.trpcService.procedure
      .input({ ...eventUpdateSchema })
      .mutation(async ({ input }) => {
        const existing = await this.eventService.getEvent(input.eventId);

        // TODO: Consider moving to service with custom error type
        if (!existing) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Event not found',
          });
        }

        return await this.eventService.updateEvent(input);
      }),
  });
}
