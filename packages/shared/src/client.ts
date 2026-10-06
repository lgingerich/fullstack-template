import { Context, Layer } from "effect"
import { FetchHttpClient, HttpClient, HttpClientRequest } from "effect/http"
import { HttpApiClient } from "effect/http-api"
import { Api } from "./api.ts"

/** The typed client for the shared `Api`, once its layer is provided. */
export class ApiClient extends Context.Service<ApiClient, HttpApiClient.ForApi<typeof Api>>()(
  "@fullstack/shared/ApiClient",
) {}

/**
 * Builds the `ApiClient` layer. Pass a `baseUrl` to target a specific origin, or
 * omit it to issue same-origin requests (the Vite dev proxy forwards them).
 */
export const makeApiClientLayer = (baseUrl?: string) =>
  Layer.effect(
    ApiClient,
    HttpApiClient.make(Api, {
      transformClient: (client) =>
        baseUrl === undefined
          ? client
          : client.pipe(
              HttpClient.mapRequest((request) => HttpClientRequest.prependUrl(request, baseUrl)),
            ),
    }),
  ).pipe(Layer.provide(FetchHttpClient.layer))
