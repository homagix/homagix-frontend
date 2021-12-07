import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // build: {
  //   manifest: true,
  // },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8200",
        timeout: 1000,
      },
    },
  },
})
