import { Generated, Insertable, Selectable, Updateable } from 'kysely';
import { EventRegistrationType } from '@schema/event-registration.schema';

export interface EventRegistrationTable {
  event_registration_id: Generated<number>;
  event_id: number;
  registration_type: EventRegistrationType;
  name: string | undefined;
  email: string | undefined;
  created_at: Generated<Date>;
}

export type EventRegistrationSelect = Selectable<EventRegistrationTable>;
export type EventRegistrationInsert = Insertable<EventRegistrationTable>;
export type EventRegistrationUpdate = Updateable<EventRegistrationTable>;
