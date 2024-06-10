import { EventTable } from './event';
import { EventRegistrationTable } from './event-registration';

export interface Tables {
  event: EventTable;
  event_registration: EventRegistrationTable;
  // more tables here...
}
