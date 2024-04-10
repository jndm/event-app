import { Injectable } from '@nestjs/common';

@Injectable()
export class EventService {
  private createdEvents = [
    {
      id: 1,
      name: 'Event 1',
      description: 'Description 1',
    },
    {
      id: 2,
      name: 'Event 2',
      description: 'Description 2',
    },
  ];

  getEvents() {
    return this.createdEvents;
  }

  addEvent(input: { name: string; description: string }) {
    const saved = {
      id: this.createdEvents.length + 1,
      ...input,
    };

    this.createdEvents.push(saved);
    return saved;
  }
}
