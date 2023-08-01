import { initTRPC } from "@trpc/server"
import { OpenApiMeta } from "trpc-openapi"

const t = initTRPC.meta<OpenApiMeta>().create()

export const router = t.router
export const procedure = t.procedure
export const middleware = t.middleware
