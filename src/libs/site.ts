export const SiteConfig = {
  title: "My Site",
  description: "My site description",
  server_port: 7654,
  version: process.env["VER"] ?? "dev",
}

export function getEnv() {
  switch (process.env["DEPLOY_ENV"]) {
    case "production":
      return "prod"
    case "test":
      return "test"
    default:
      return "dev"
  }
}
