import { Api } from "@fullstack/shared"
import { Effect } from "effect"
import { HttpApiBuilder } from "effect/http-api"
import { Greeter } from "./services/greeter.ts"

/**
 * Implements the `system` group from the shared `Api`. `Greeter` is captured
 * when the group is built, so this layer requires `Greeter` and a missing or
 * misspelled endpoint is a compile error.
 */
export const SystemGroupLive = HttpApiBuilder.group(
  Api,
  "system",
  Effect.fn(function* (handlers) {
    const greeter = yield* Greeter
    return handlers.handle("hello", () => greeter.greet)
  }),
)
