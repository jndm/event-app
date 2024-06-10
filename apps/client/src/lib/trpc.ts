import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { TrpcRouter } from "@server/app.router";

export const trpc = createTRPCProxyClient<TrpcRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.PUBLIC_NESTJS_SERVER}/trpc`,
    }),
  ],
});
