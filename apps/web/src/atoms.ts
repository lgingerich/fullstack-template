import { ApiClient } from "@fullstack/shared"
import { Effect } from "effect"
import { Atom } from "effect/reactivity"
import { ApiClientLive } from "./api.ts"

/**
 * The `hello` endpoint exposed as an atom. `Atom.make` runs the effect when the
 * atom is mounted and exposes progress as an `AsyncResult` the UI can render.
 */
export const helloAtom = Atom.make(
  Effect.gen(function* () {
    const client = yield* ApiClient
    return yield* client.system.hello({})
  }).pipe(Effect.provide(ApiClientLive)),
)
