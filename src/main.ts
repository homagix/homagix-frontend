import { createApp } from "vue"
import App from "@/App.vue"
import store from "@/store"
import router from "@/router"

if (import.meta.env.MODE === "development") {
  const { worker } = await import("./mocks/browser")
  worker.start({
    onUnhandledRequest(req) {
      console.error("Found an unhandled %s request to %s", req.method, req.url.href)
    },
  })
}

createApp(App).use(store).use(router).mount("#app")
