import { procedure, router } from "./trpc"
import { z } from "zod"
import type { inferRouterOutputs } from "@trpc/server"

export const appRouter = router({
  health: procedure
    .meta({ openapi: { method: "GET", path: "/health", tags: ["meta"] } })
    .input(z.undefined())
    .output(z.object({ status: z.string() }))
    .query(async () => {
      return { status: "ok", greet: "hello" }
    }),
})

export type AppRouter = typeof appRouter

export type TRouterOutput = inferRouterOutputs<AppRouter>
