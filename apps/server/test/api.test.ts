import { assert, layer } from "@effect/vitest"
import { Api } from "@fullstack/shared"
import { Effect, Layer } from "effect"
import { HttpServer } from "effect/http"
import { HttpApiTest } from "effect/http-api"
import { SystemGroupLive } from "../src/handlers.ts"
import { GreeterLive } from "../src/services/greeter.ts"

/**
 * Exercises the API through the same request encoding, routing, and response
 * decoding as the real server, without binding a port. `HttpApiTest.groups`
 * returns an in-memory client wired to the handlers in the environment, so this
 * covers the shared contract, the handler, and the `Greeter` service together.
 */
const Handlers = SystemGroupLive.pipe(Layer.provide(GreeterLive))
const makeClient = HttpApiTest.groups(Api, ["system"])

layer(Layer.mergeAll(Handlers, HttpServer.layerServices))("system group", (it) => {
  it.effect("hello returns the greeting from the Greeter service", () =>
    Effect.gen(function* () {
      const client = yield* makeClient
      const greeting = yield* client.system.hello({})
      assert.strictEqual(greeting.message, "hello from effect")
    }),
  )
})
