import { Greeting } from "@fullstack/shared"
import { Context, Effect, Layer } from "effect"

/**
 * A service that the `hello` endpoint depends on. Swap `GreeterLive` for a real
 * implementation (database, upstream API) without touching the handler.
 */
export class Greeter extends Context.Service<
  Greeter,
  {
    readonly greet: Effect.Effect<Greeting>
  }
>()("@fullstack/server/Greeter") {}

export const GreeterLive = Layer.succeed(Greeter, {
  greet: Effect.succeed(new Greeting({ message: "hello from effect" })),
})
