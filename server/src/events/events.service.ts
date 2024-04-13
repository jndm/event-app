import { Injectable } from '@nestjs/common';
import { Database } from '@server/database/database';
import { Event, NewEvent } from '@server/database/tables/event';

@Injectable()
export class EventService {
  constructor(private readonly database: Database) {}

  getEvents(): Promise<Event[]> {
    return this.database.selectFrom('event').selectAll().execute();
  }
  async addEvent(input: NewEvent): Promise<bigint | undefined> {
    return (
      await this.database.insertInto('event').values(input).executeTakeFirst()
    ).insertId;
  }
}
