# rubbish-dashboard-template

An opinionated full-stack template for a dashboard project

stacks:

- develop frontend with `nextjs(app router)` + `tailwindcss` + `redux`
- integrated rich-text-editor(`mantine` + `tiptap`)
- develop api server with `fastify` and `trpc`
- access database via `prisma`
- generate openapi spec automatically with `@fastify/swagger` and generate api client with `openapi-generator`
- fully typed everywhere
- log with `pino`
- lint with `eslint` + `prettier`
- deploy with `pm2` and pack all the application into one `docker image`
- dark mode switch

`pnpm i && pnpm dev` and everything is ready to go

## Quick Start Guide

1. [Adding Prisma Migrate to an existing project](https://www.prisma.io/docs/orm/prisma-migrate/getting-started#adding-prisma-migrate-to-an-existing-project)

## TODO

- [ ] integrate with `kratos` to provide instant user management and authentication feature
- [ ] reduce docker image size
- [ ] split frontend and server docker
- [ ] observability using `sentry` and `prometheus`
- [ ] curd example
- [ ] multipart example
