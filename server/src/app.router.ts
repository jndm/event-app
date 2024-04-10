import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import { TestRouter } from './test/test.router';
import { EventRouter } from './events/events.router';
import * as trpcExpress from '@trpc/server/adapters/express';

@Injectable()
export class AppRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly eventRouter: EventRouter,
    private readonly testRouter: TestRouter,
  ) {}

  router = this.trpcService.router({
    events: this.eventRouter.router,
    test: this.testRouter.router,
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({ router: this.router }),
    );
  }
}

export type TrpcRouter = AppRouter['router'];
