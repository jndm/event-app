import { INestApplication, Injectable } from '@nestjs/common';
import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';
import { TrpcService } from '@server/trpc/trpc.service';
import { eventCreateSchema } from '@server/lib/schemas/event.schema';

const createdEvents = [
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

@Injectable()
export class TrpcRouter {
  constructor(private readonly trpcService: TrpcService) {}

  appRouter = this.trpcService.router({
    events: this.trpcService.procedure.query(() => {
      return createdEvents;
    }),

    // TODO: create separate router for events
    add_event: this.trpcService.procedure
      .input({ ...eventCreateSchema, id: z.date() })
      .mutation(({ input }) => {
        console.log(input);

        // TODO: actually save to database
        const saved = {
          id: createdEvents.length + 1,
          ...input,
        };

        createdEvents.push(saved);
        return saved;
      }),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({ router: this.appRouter }),
    );
  }
}

export type AppRouter = TrpcRouter['appRouter'];
