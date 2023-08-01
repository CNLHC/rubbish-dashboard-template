import { procedure, router } from "./trpc"
import { z } from "zod"

export const appRouter = router({
  health: procedure
    .meta({ openapi: { method: "GET", path: "/health", tags: ["meta"] } })
    .input(z.undefined())
    .output(z.object({ status: z.string() }))
    .query(async () => {
      return { status: "ok" }
    }),
})

export type AppRouter = typeof appRouter
