import { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface Database {
  person: EventTable;
  // more tables here...
}

export interface EventTable {
  event_id: Generated<number>;
  name: string;
  description: string | null;
}

// You should not use the table schema interfaces directly. Instead, you should
// use the `Selectable`, `Insertable` and `Updateable` wrappers. These wrappers
// make sure that the correct types are used in each operation.
//
// Most of the time you should trust the type inference and not use explicit
// types at all. These types can be useful when typing function arguments.

// TODO: remove?
export type Event = Selectable<EventTable>;
export type NewEvent = Insertable<EventTable>;
export type EventUpdate = Updateable<EventTable>;
