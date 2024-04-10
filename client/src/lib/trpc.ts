import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { TrpcRouter } from "@server/app.router";

export const trpc = createTRPCProxyClient<TrpcRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:4000/trpc", // should be from env
    }),
  ],
});
