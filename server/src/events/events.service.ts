import { Injectable } from '@nestjs/common';
import { Database } from '@server/database/database';
import { Event, EventInsert, EventUpdate } from '@server/database/tables/event';

@Injectable()
export class EventService {
  constructor(private readonly database: Database) {}

  async getEvents(): Promise<Event[]> {
    return await this.database //
      .selectFrom('event')
      .selectAll()
      .execute();
  }

  async getEvent(eventId: number): Promise<Event | undefined> {
    return await this.database
      .selectFrom('event')
      .selectAll()
      .where('event_id', '=', eventId)
      .executeTakeFirst();
  }

  async addEvent(input: EventInsert): Promise<void> {
    await this.database //
      .insertInto('event')
      .values(input)
      .executeTakeFirst();
  }

  async updateEvent(input: EventUpdate): Promise<void> {
    if (!input.event_id) throw new Error('event_id is required');

    this.database
      .updateTable('event')
      .set(input)
      .where('event_id', '=', input.event_id)
      .executeTakeFirst();
  }

  async deleteEvent(eventId: number): Promise<void> {
    this.database
      .deleteFrom('event')
      .where('event_id', '=', eventId)
      .executeTakeFirst();
  }
}
