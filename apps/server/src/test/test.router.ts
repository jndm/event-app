import { Injectable } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import { TestService } from '@server/test/test.service';
import { z } from 'zod';

@Injectable()
export class TestRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly testService: TestService,
  ) {}

  router = this.trpcService.router({
    events: this.trpcService.procedure
      .input(z.object({ name: z.string() }))
      .query(({ input }) => {
        return this.testService.getGreeting(input.name);
      }),
  });
}
