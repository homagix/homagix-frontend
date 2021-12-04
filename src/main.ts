import { createApp } from "vue"
import App from "@/App.vue"
import store from "@/store"
import createRouter from "@/router"
import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga-full-vars.css';

if (import.meta.env.MODE === "development") {
  const { worker } = await import("./mocks/browser")
  worker.start({
    onUnhandledRequest(req) {
      console.error("Found an unhandled %s request to %s", req.method, req.url.href)
    },
  })
}

createApp(App).use(store).use(createRouter(store)).use(Oruga, {iconPack: 'fas'}).mount("#app")
