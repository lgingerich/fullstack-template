import { useAtomValue } from "@effect/atom-react"
import { AsyncResult } from "effect/reactivity"
import { helloAtom } from "./atoms.ts"

export const App = () => {
  const greeting = useAtomValue(helloAtom)

  return (
    <main>
      <h1>Fullstack Template</h1>
      <p>This message is fetched from the server over the shared API client.</p>
      {AsyncResult.builder(greeting)
        .onInitial(() => <p>Loading…</p>)
        .onSuccess((value) => <p>{value.message}</p>)
        .onFailure(() => <p>Could not reach the server.</p>)
        .orElse(() => (
          <p>Loading…</p>
        ))}
    </main>
  )
}
