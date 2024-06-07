import { Global, Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';

@Global()
@Injectable()
export class TrpcService {
  trpc = initTRPC.create();
  procedure = this.trpc.procedure;
  router = this.trpc.router;
  mergeRouters = this.trpc.mergeRouters;
}
