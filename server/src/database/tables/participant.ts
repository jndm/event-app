import { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface ParticipantTable {
  participant_id: Generated<number>;
  event_id: number;
  first_name: string | undefined;
  last_name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  created_at: Generated<Date>;
}

export type ParticipantSelect = Selectable<ParticipantTable>;
export type ParticipantInsert = Insertable<ParticipantTable>;
export type ParticipantUpdate = Updateable<ParticipantTable>;
