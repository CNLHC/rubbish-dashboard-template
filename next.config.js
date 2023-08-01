/** @type {import('next').NextConfig} */
const getStage = () => {
  env = process.env.DEPLOY_ENV ?? process.env.NODE_ENV
  switch (env) {
    case "prod":
    case "production":
      return "prod"
    case "canary":
      return "canary"
    default:
      return "dev"
  }
}

module.exports = {
  /* config options here */
}
