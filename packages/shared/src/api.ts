import { Schema } from "effect"
import { HttpApi, HttpApiEndpoint, HttpApiGroup } from "effect/http-api"

/**
 * The HTTP contract. `apps/server` implements these endpoints and `apps/web`
 * consumes the client derived from them, so the two cannot drift.
 */

/** Response for the sample `hello` endpoint. */
export class Greeting extends Schema.Class<Greeting>("Greeting")({
  message: Schema.NonEmptyString,
}) {}

/** A sample endpoint that exercises a typed response. */
export const hello = HttpApiEndpoint.get("hello", "/hello", {
  success: Greeting,
})

export const systemGroup = HttpApiGroup.make("system").add(hello)

export const Api = HttpApi.make("fullstack-template").add(systemGroup)
