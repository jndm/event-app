import { Injectable } from '@nestjs/common';
import { Database } from '@server/database/database';
import { EventSelect } from '@server/database/tables/event';
import {
  Event,
  EventCreateInput,
  EventUpdateInput,
} from './schemas/event.schema';
import { format } from 'date-fns';

@Injectable()
export class EventService {
  constructor(private readonly database: Database) {}

  async getEvents(): Promise<Event[]> {
    const dbEvents = await this.database //
      .selectFrom('event')
      .selectAll()
      .execute();

    return (
      dbEvents.map((event) => ({
        eventId: event.event_id,
        name: event.name,
        description: event.description,
        eventStart: event.event_start,
      })) ?? []
    );
  }

  async getEvent(eventId: number): Promise<EventSelect | undefined> {
    return await this.database
      .selectFrom('event')
      .selectAll()
      .where('event_id', '=', eventId)
      .executeTakeFirst();
  }

  async addEvent(input: EventCreateInput): Promise<void> {
    await this.database //
      .insertInto('event')
      .values({
        name: input.name,
        description: input.description,
        event_start: new Date(
          `${format(input.eventStartDate, 'yyyy-MM-dd')}T${input.eventStartTime}`,
        ),
      })
      .executeTakeFirst();
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
