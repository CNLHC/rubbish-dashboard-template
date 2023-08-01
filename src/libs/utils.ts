import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import type { AppRouter } from "../server/router"

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_ENDPOINT}/trpc`,
      async headers() {
        return {
          // authorization: getAuthCookie(),
        }
      },
    }),
  ],
})

export function useTRPC() {
  return { cli: client }
}
