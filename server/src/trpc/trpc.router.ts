import { INestApplication, Injectable } from '@nestjs/common';
import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';
import { TrpcService } from '@server/trpc/trpc.service';
import { TRPCError } from '@trpc/server';

@Injectable()
export class TrpcRouter {
  constructor(private readonly trpcService: TrpcService) {}

  appRouter = this.trpcService.router({
    hello: this.trpcService.procedure
      .input(
        z.object({
          name: z.string(),
        }),
      )
      .query(({ input }) => {
        if (input.name === 'error') {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Not found',
          });
        } else {
          return 'Hello, ' + input.name + '!';
        }
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
