import { Api } from "@fullstack/shared"
import { Layer } from "effect"
import { HttpApiBuilder } from "effect/http-api"
import { SystemGroupLive } from "./handlers.ts"
import { GreeterLive } from "./services/greeter.ts"

/**
 * The complete API, with each group's handlers provided. `SystemGroupLive`
 * requires `Greeter`; this is the composition root where you swap the sample
 * service for a real implementation.
 */
export const ApiLive = HttpApiBuilder.layer(Api).pipe(
  Layer.provide(SystemGroupLive),
  Layer.provide(GreeterLive),
)
