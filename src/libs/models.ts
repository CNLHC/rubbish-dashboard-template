import { z } from "zod"

export const ZPagination = z.object({
  limit: z.number(),
  offset: z.number(),
  total: z.number(),
})
