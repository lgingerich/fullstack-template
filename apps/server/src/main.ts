import { createServer } from "node:http"
import { NodeHttpServer, NodeRuntime } from "@effect/platform-node"
import { Layer } from "effect"
import { HttpRouter } from "effect/http"
import { ApiLive } from "./api.ts"
import { ServerConfig } from "./config.ts"

/**
 * Serves the API over Node's HTTP server. `ServerConfig` supplies the bind
 * address, so `HOST` / `PORT` are read from the environment.
 */
const HttpLive = HttpRouter.serve(ApiLive).pipe(
  Layer.provide(
    NodeHttpServer.layerConfig(createServer, {
      host: ServerConfig.host,
      port: ServerConfig.port,
    }),
  ),
)

NodeRuntime.runMain(Layer.launch(HttpLive))
