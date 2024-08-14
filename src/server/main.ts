import cors from "@fastify/cors"
import ws from "@fastify/websocket"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUI from "@fastify/swagger-ui"

import {
  appRouter as demobaseRouter,
  fastifyTRPCPlugin as demoBaseFastifyTRPCPlugin,
  createContext,
  AppRouter,
  FastifyTRPCPluginOptions,
} from "@sought/demobase"
import { Type, TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import fastify, { FastifyPluginAsync } from "fastify"
import { SiteConfig } from "../libs/site"
import GetLogger from "./logger"
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify"
import { fastifyTRPCOpenApiPlugin, generateOpenApiDocument } from "trpc-openapi"
import { appRouter, AppRouter as TLocalAppRouter } from "./router"

const logger = GetLogger()

const app = fastify({ logger }).withTypeProvider<TypeBoxTypeProvider>()

const initSwagger = async () => {
  await app.register(fastifySwagger, {
    mode: "dynamic",
    hideUntagged: false,
    openapi: {
      info: {
        title: SiteConfig.title,
        description: SiteConfig.description,
        version: process.env["VER"] ?? "dev",
      },
    },
  })
  await app.register(fastifySwaggerUI, {
    routePrefix: "/doc",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    staticCSP: true,
  })
}

const MetaView: FastifyPluginAsync = async (app) => {
  app.get(
    "/ready",
    {
      schema: {
        tags: ["meta"],
        summary: "Check if the server is ready",
      },
    },
    async () => {
      return { status: "ok" }
    }
  )
  app.get(
    "/version",
    {
      schema: {
        tags: ["meta"],
        summary: "get the server version",
        response: {
          200: Type.Object({ version: Type.String() }),
        },
      },
    },
    async () => {
      return {
        version: SiteConfig.version,
      }
    }
  )
}

const initTRPC: FastifyPluginAsync = async (app) => {
  app.register(ws)
  const openApiDocument = generateOpenApiDocument(appRouter, {
    title: "Example CRUD API",
    description: "OpenAPI compliant REST API built using tRPC with Fastify",
    version: "1.0.0",
    baseUrl: "http://localhost:7654/trpc",
    tags: ["meta"],
  })
  app.register(fastifyTRPCPlugin, {
    prefix: "/app-trpc",
    useWSS: true,
    trpcOptions: {
      router: appRouter,
      createContext,
    } satisfies FastifyTRPCPluginOptions<TLocalAppRouter>["trpcOptions"],
  })

  app.register(demoBaseFastifyTRPCPlugin, {
    prefix: "/demobase",
    useWSS: true,
    trpcOptions: {
      router: demobaseRouter,
      createContext: createContext,
    } satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
  })
  app.register(fastifyTRPCOpenApiPlugin, {
    router: appRouter,
    basePath: "/trpc",
  })

  app.get("/demobase/openapi.json", () => openApiDocument)
  app.get("/trpc/openapi.json", () => openApiDocument)
}

async function serve() {
  await initSwagger()
  app.register(cors, {
    origin: "*",
    methods: "*",
    allowedHeaders: "*,content-type,baggage,sentry-trace",
    credentials: true,
  })

  await app.register(initTRPC)
  await app.register(MetaView, { prefix: "/meta" })

  await app.ready()
  app.swagger()
  const port = SiteConfig.server_port
  await app.listen(
    {
      port: port,
      host: "0.0.0.0",
    },
    (err, address) => {
      if (err) logger.error(`error in listen at ${address} ${err}`)
    }
  )
}

serve()
