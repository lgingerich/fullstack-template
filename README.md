# Fullstack Template

A TypeScript fullstack starter: pnpm workspaces, Turborepo, Effect 4,
React 19 + Vite, and Biome. One endpoint is wired end to end — shared contract,
server handler, and React UI — so you can see the shape before you replace it.

## Included

- Pinned Node and pnpm workspaces
- TypeScript 7 (`tsc`) in strict mode
- [Effect](https://effect.website) 4 for HTTP, schema, config, and services
- An `effect/http-api` contract in `packages/shared`, with the typed client
  derived from the same declaration
- A React 19 + Vite web app that reads the endpoint through an Effect atom
- Vitest 5 for tests, with a server test that runs the API in memory
- Turborepo for task orchestration and affected-only runs
- GitHub Actions CI running lint, typecheck, and test

## Layout

```
apps/server      Effect HttpApi over the Node HTTP server
apps/web         React 19 + Vite, calls the API through Effect atoms
packages/shared  Effect Schema contract + the derived typed client
```

`packages/shared` is the seam: both apps depend on it, neither depends on the
other. Its `package.json` exports the TypeScript source directly, and Node's
native type stripping runs it without a build step.

## First Steps

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start the server and web app:

   ```bash
   pnpm dev
   ```

   The server listens on `http://localhost:3000`, the web app on
   `http://localhost:5173`. Vite proxies `/hello` to the server.

3. Rename the packages and update `description` in each `package.json`.
4. Replace the sample `hello` endpoint in `packages/shared` with your domain.
5. Run the full check:

   ```bash
   pnpm check
   ```

## The sample slice

- `packages/shared/src/api.ts` declares the `system` group and the `hello`
  endpoint returning a `Greeting`.
- `apps/server/src/handlers.ts` implements `hello` through the `Greeter` service;
  `apps/server/src/api.ts` provides `GreeterLive`. Swap that layer for a real
  implementation without touching the handler.
- `apps/web/src/atoms.ts` wraps the call in an atom, and `App.tsx` renders it.
- `apps/server/test/api.test.ts` runs the same handlers through an in-memory
  client with `HttpApiTest`.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Run all dev servers via Turborepo |
| `pnpm build` | Build the web app for production |
| `pnpm typecheck` | Type-check with the native compiler |
| `pnpm test` | Run tests |
| `pnpm lint` | Lint and format-check with Biome |
| `pnpm format` | Apply Biome fixes |
| `pnpm check` | Lint, typecheck, and test |

## Notes

- Use `pnpm turbo run test --affected` to run only what changed.
- Node and TypeScript both accept the `.ts` import extensions used throughout,
  because the server and the shared package are executed from source.

## License

MIT. See [LICENSE](./LICENSE) for the full text.
