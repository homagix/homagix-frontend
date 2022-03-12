import path from "path"
import { defineConfig, UserConfigExport } from "vite"
import vue from "@vitejs/plugin-vue"
import { server } from "./src/mocks/server"

const base = process.env.NODE_ENV === "production" ? "/homagix-frontend/" : "/"

server.listen()

// https://vitejs.dev/config/
export default defineConfig({
  base,
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
    coverage: {
      all: true,
      include: ["src/**/*.{ts,vue}"],
      exclude: ["src/mocks/**/*"],
      reporters: ["text", "html"],
    },
  },
} as UserConfigExport)
