import { Injectable } from '@nestjs/common';
import {
  Event,
  eventCreateSchema,
  eventUpdateSchema,
  eventGetSchema,
} from '@server/events/schemas/event.schema';
import { TrpcService } from '@server/trpc/trpc.service';
import { EventService } from './events.service';
import { TRPCError } from '@trpc/server';

@Injectable()
export class EventRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly eventService: EventService,
  ) {}

  // Middleware to decrypt the event ID, used for all procedures that require an event id
  decryptEventIdProcedure = this.trpcService.procedure.use(
    async ({ next, rawInput, ctx }) => {
      const result = eventGetSchema.safeParse(rawInput);
      if (!result.success) throw new TRPCError({ code: 'BAD_REQUEST' });
      const { encryptedId, salt } = result.data;

      const eventId = this.eventService.getEventId(encryptedId, salt);

      if (Number.isNaN(eventId)) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid event ID',
        });
      }

      return next({ ctx: { ...ctx, eventId } });
    },
  );

  router = this.trpcService.router({
    getAll: this.trpcService.procedure //
      .query(async (): Promise<Event[]> => {
        return await this.eventService.getEvents();
      }),

    get: this.decryptEventIdProcedure
      .input({ ...eventGetSchema })
      .query(async ({ ctx }): Promise<Event> => {
        return await this.eventService.getEvent(ctx.eventId);
      }),

    add: this.trpcService.procedure
      .input({ ...eventCreateSchema })
      .mutation(async ({ input }) => {
        return await this.eventService.addEvent(input);
      }),

    delete: this.decryptEventIdProcedure
      .input({ ...eventGetSchema })
      .mutation(async ({ ctx }) => {
        return await this.eventService.deleteEvent(ctx.eventId);
      }),

    update: this.decryptEventIdProcedure
      .input({ ...eventUpdateSchema })
      .mutation(async ({ ctx, input }) => {
        return await this.eventService.updateEvent(ctx.eventId, input);
      }),
  });
}
