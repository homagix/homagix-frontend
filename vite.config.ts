import path from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { server } from "./src/mocks/server"

server.listen()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // build: {
  //   manifest: true,
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8200",
        timeout: 1000,
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
})
