module.exports = {
  apps: [
    {
      name: "server",
      script: "src/server/main.ts",
      interpreter: "node_modules/.bin/ts-node",
      env_production: {
        NODE_ENV: "production",
        DEPLOY_ENV: "production",
      },
    },
    {
      name: "next2",
      script: "pnpm",
      interpreter: "/bin/sh",
      args: "next:start",
    },
  ],
}
