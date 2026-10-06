import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Forward same-origin API calls to the server during development.
      "/hello": "http://localhost:3000",
    },
  },
})
