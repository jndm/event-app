import { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface EventTable {
  event_id: Generated<number>;
  name: string;
  description: string | null;
}

export type Event = Selectable<EventTable>;
export type NewEvent = Insertable<EventTable>;
export type EventUpdate = Updateable<EventTable>;
