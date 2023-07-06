# rubbish-dashboard-template

An opinionated full-stack template for a dashboard project

stacks:

- develop frontend with nextjs(app router) + antd + tailwindcss + redux
- develop api server with fastify
- access database via prisma and typeorm
- migrate database via typeorm migrate
- generate openapi spec automatically with `@fastify/swagger` and generate api client with `openapi-generator`
- fully typed everywhere
- log with `pino`
- lint with `eslint` + `prettier`

`pnpm i && pnpm dev` and everything is ready to go
