import cors from "@fastify/cors"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUI from "@fastify/swagger-ui"
import { Type, TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import fastify, { FastifyPluginAsync } from "fastify"
import { SiteConfig } from "../libs/site"
import GetLogger from "./logger"

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
    async (req) => {
      return {
        version: SiteConfig.version,
      }
    }
  )
}

async function serve() {
  await initSwagger()
  app.register(cors, {
    origin: "http://localhost:3000",
    methods: "*",
    allowedHeaders: "*,content-type,baggage,sentry-trace",
    credentials: true,
  })

  app.register(MetaView, { prefix: "/meta" })

  await app.ready()
  app.swagger()
  const port = SiteConfig.server_port
  await app.listen(
    {
      port: port,
      host: "0.0.0.0",
    },
    (err, address) => {
      if (err) logger.error(err)
    }
  )
}

serve()