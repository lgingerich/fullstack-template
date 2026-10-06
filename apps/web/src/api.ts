import { makeApiClientLayer } from "@fullstack/shared"

/**
 * The typed API client for the browser. No `baseUrl` is passed, so requests are
 * same-origin and the Vite dev proxy forwards `/hello` to the server.
 */
export const ApiClientLive = makeApiClientLayer()
