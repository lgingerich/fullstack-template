import { Config } from "effect"

/** Server configuration, read from the environment. */
export const ServerConfig = {
  host: Config.String("HOST").pipe(Config.withDefault("0.0.0.0")),
  port: Config.Port("PORT").pipe(Config.withDefault(3000)),
}
