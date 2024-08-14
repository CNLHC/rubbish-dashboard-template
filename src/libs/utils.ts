import {
  TRPCClientError,
  createTRPCProxyClient,
  httpBatchLink,
} from "@trpc/client"
import dotenv from "dotenv"
import _ from "lodash"
import type { AppRouter } from "../server/router"

dotenv.config()

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

export function ConfigGetString(key: string, _default?: string): string {
  const str = _.get(process.env, key)
  if (!str) {
    if (_default) {
      return _default
    }
    console.error("not found config key ", key)
    process.exit(1)
  }
  return str
}

export function extractTRPCErr(e: Error, fallback = "未知错误") {
  const err = TRPCClientError.from(e)
  try {
    console.error(err)
    const obj = JSON.parse(err.message)
    if (obj?.message) {
      return obj?.message as string
    }
    if (obj?.[0]?.message) {
      return obj?.[0]?.message as string
    }
  } catch (e) {
    console.error(e)
  }
  return (err.message as string) ?? fallback
}

export function prefixedWith(prefix: string) {
  return (key: unknown) => {
    if (typeof key == "string") return key.startsWith(prefix)
    if (Array.isArray(key)) {
      for (const k of key) {
        if (k.startsWith(prefix)) return true
      }
    }
    return false
  }
}
