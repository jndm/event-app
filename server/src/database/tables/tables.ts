import { EventTable } from './event';
import { ParticipantTable } from './participant';

export interface Tables {
  event: EventTable;
  participant: ParticipantTable;
  // more tables here...
}
