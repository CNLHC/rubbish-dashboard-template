import pino, { Logger } from "pino"
import { getEnv } from "../libs/site"

let logger: Logger

export default function GetLogger(bind?: pino.Bindings) {
  if (!logger) {
    switch (getEnv()) {
      case "dev":
        return pino({
          transport: {
            target: "pino-pretty",
            options: {
              translateTime: "HH:MM:ss Z",
              ignore: "pid,hostname",
            },
          },
        })
      default:
        return pino()
    }
  }
  return logger.child(bind ?? {})
}
