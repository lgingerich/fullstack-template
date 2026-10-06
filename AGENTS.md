# AGENTS.md

Guidance for AI coding agents working in this repository.

## Core Behavior

- Ask before assuming when requirements, architecture, or intent are unclear.
- Prefer the simplest solution that satisfies the request.
- Think before writing code for architecture, debugging, or non-trivial feature
  work. Surface the approach and tradeoffs first.
- Stay in scope. Only modify files and code directly related to the current task.
- Do not refactor, rename, reformat, or reorganize unrelated code. Mention
  worthwhile follow-ups instead of making them.
- Ask before big changes that restructure existing code, remove behavior, change
  public APIs, or alter project conventions.
- Do not preserve backwards compatibility for internal APIs unless the user
  explicitly asks. When an internal API needs different semantics, update the
  existing function/type directly and migrate call sites.
- Do not add parallel helpers such as `*_trusted`, `*_unchecked`, or alternate
  constructors merely to avoid changing existing internal callers. Prefer one
  clear function with the correct invariant boundary.
- Admit uncertainty before it costs the user. If a fact, version, API, or
  approach is uncertain, say so before relying on it.
- Before destructive or irreversible actions, explain the impact and wait for
  explicit confirmation.

## TypeScript Project Standards

- Use pnpm for all dependency and script workflows, and Turborepo for tasks that
  span packages.
- Lock the stack to TypeScript, Node, pnpm, Effect, React, Vite, Vitest, Biome,
  and Turborepo unless the user asks for alternatives.
- Match the existing strictness in `tsconfig.base.json`. Do not weaken it without
  calling it out first.
- Keep `packages/shared` free of framework and platform code: the Effect HTTP
  contract (`src/api.ts`) and the client derived from it (`src/client.ts`). No
  React, no Node built-ins, no DOM. `apps/server` and `apps/web` depend on it;
  neither may depend on the other.
- Describe HTTP endpoints once with `effect/http-api`. Derive the client from the
  same declaration rather than hand-writing `fetch` calls or duplicate types.
- Model expected failures as typed errors, not thrown exceptions or `any`.
- Do not weaken lint levels or CI checks without calling it out first.

## Verification

After code changes, run the relevant checks:

```bash
pnpm lint
pnpm typecheck
pnpm test
```

To scope a check to one package, filter through Turborepo:

```bash
pnpm turbo run test --filter=@fullstack/server
```

## Communication

- Never open with filler phrases like "Great question", "Of course", or
  "Certainly". Start with the answer or action.
- Match length to the task. Be concise for small tasks and more detailed for
  design/debugging work.
- Summarize what changed and how it was verified.
- Mention useful follow-ups, but do not implement them without being asked.
