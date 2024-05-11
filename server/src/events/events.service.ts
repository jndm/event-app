import { Injectable } from '@nestjs/common';
import { Database } from '@server/database/database';
import {
  Event,
  EventCreateInput,
  EventUpdateInput,
} from './schemas/event.schema';
import { format } from 'date-fns';
import { TRPCError } from '@trpc/server';
import { CryptoService } from '@server/crypto.service';

@Injectable()
export class EventService {
  constructor(
    private readonly database: Database,
    private readonly cryptoService: CryptoService,
  ) {}

  async getEvents(): Promise<Event[]> {
    const dbEvents = await this.database //
      .selectFrom('event')
      .selectAll()
      .execute();

    return dbEvents.map(
      (event): Event =>
        ({
          encryptedId: this.cryptoService.encryptEventId(
            event.event_id,
            event.salt,
          ),
          name: event.name,
          description: event.description,
          eventStart: format(
            'yyyy-MM-ddTHH:mm:ss',
            event.event_start.toString(),
          ),
          eventEnd: event.event_end
            ? format('yyyy-MM-ddTHH:mm:ss', event.event_end.toString())
            : undefined,

          salt: event.salt,
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
      name: dbEvent.name,
      description: dbEvent.description,
      eventStart: dbEvent.event_start.toString(),
      eventEnd: dbEvent.event_end?.toString(),
      encryptedId: this.cryptoService.encryptEventId(
        dbEvent.event_id,
        dbEvent.salt,
      ),
      salt: dbEvent.salt,
    };
  }

  async addEvent(input: EventCreateInput): Promise<Event> {
    const salt = this.cryptoService.generateSalt();

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
      salt: salt,
    };

    const created = await this.database
      .insertInto('event')
      .values(dbEvent)
      .returning('event_id')
      .executeTakeFirstOrThrow();

    return {
      name: dbEvent.name,
      description: dbEvent.description,
      eventStart: dbEvent.event_start.toString(),
      eventEnd: dbEvent.event_end?.toString(),
      encryptedId: this.cryptoService.encryptEventId(created.event_id, salt),
      salt: salt,
    };
  }

  async updateEvent(eventId: number, input: EventUpdateInput): Promise<void> {
    // Verify exists
    this.getEvent(eventId);

    await this.database
      .updateTable('event')
      .set({
        name: input.name,
        description: input.description,
      })
      .where('event_id', '=', eventId)
      .executeTakeFirst();
  }

  async deleteEvent(eventId: number): Promise<void> {
    await this.database
      .deleteFrom('event')
      .where('event_id', '=', eventId)
      .executeTakeFirst();
  }

  getEventId = (encryptedId: string, salt: string) =>
    this.cryptoService.decryptEventId(encryptedId, salt);
}
