import { Injectable } from '@nestjs/common';
import { Database } from '@server/database/database';
import {
  Event,
  EventCreateInput,
  EventUpdateInput,
} from './schemas/event.schema';
import { format } from 'date-fns';
import { TRPCError } from '@trpc/server';

@Injectable()
export class EventService {
  constructor(private readonly database: Database) {}

  async getEvents(): Promise<Event[]> {
    const dbEvents = await this.database //
      .selectFrom('event')
      .selectAll()
      .execute();

    return dbEvents.map(
      (event): Event =>
        ({
          eventId: event.event_id,
          name: event.name,
          description: event.description,
          eventStart: format(
            'yyyy-MM-ddTHH:mm:ss',
            event.event_start.toString(),
          ),
          eventEnd: event.event_end
            ? format('yyyy-MM-ddTHH:mm:ss', event.event_end.toString())
            : undefined,
        }) ?? [],
    );
  }

  async getEvent(eventId: number): Promise<Event> {
    const dbEvent = await this.database
      .selectFrom('event')
      .selectAll()
      .where('event_id', '=', eventId)
      .executeTakeFirst();

    if (!dbEvent) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Event not found',
      });
    }

    return {
      eventId: dbEvent.event_id,
      name: dbEvent.name,
      description: dbEvent.description,
      eventStart: dbEvent.event_start.toString(),
      eventEnd: dbEvent.event_end?.toString(),
    };
  }

  async addEvent(input: EventCreateInput): Promise<Event> {
    const dbEvent = {
      name: input.name,
      description: input.description,
      event_start: new Date(
        `${format(input.eventStartDate, 'yyyy-MM-dd')}T${input.eventStartTime}`,
      ),
      event_end: input.eventEndDate
        ? new Date(
            `${format(input.eventEndDate, 'yyyy-MM-dd')}T${input.eventEndTime}`,
          )
        : undefined,
    };

    const created = await this.database //
      .insertInto('event')
      .values(dbEvent)
      .returning('event_id')
      .executeTakeFirstOrThrow();

    return {
      eventId: created.event_id,
      name: dbEvent.name,
      description: dbEvent.description,
      eventStart: dbEvent.event_start.toString(),
      eventEnd: dbEvent.event_end?.toString(),
    };
  }

  async updateEvent(input: EventUpdateInput): Promise<void> {
    if (!input.eventId) throw new Error('event_id is required');

    await this.database
      .updateTable('event')
      .set({
        name: input.name,
        description: input.description,
      })
      .where('event_id', '=', input.eventId)
      .executeTakeFirst();
  }

  async deleteEvent(eventId: number): Promise<void> {
    await this.database
      .deleteFrom('event')
      .where('event_id', '=', eventId)
      .executeTakeFirst();
  }
}
