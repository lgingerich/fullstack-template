import { RegistryProvider } from "@effect/atom-react"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App.tsx"
import "./styles.css"

const container = document.getElementById("root")
if (container === null) {
  throw new Error("Missing #root element in index.html")
}

createRoot(container).render(
  <StrictMode>
    <RegistryProvider>
      <App />
    </RegistryProvider>
  </StrictMode>,
)
