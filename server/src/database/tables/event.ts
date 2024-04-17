import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface EventTable {
  event_id: Generated<number>;
  name: string;
  description: string | undefined;
  event_start: Date;
  event_end: Date | undefined;
  created_at: Generated<Date>;
  updated_at: ColumnType<Date | undefined, never, Date>;
}

export type Event = Selectable<EventTable>;
export type EventInsert = Insertable<EventTable>;
export type EventUpdate = Updateable<EventTable>;
