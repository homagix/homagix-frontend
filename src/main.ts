// Could be replaced in the future with a sass import
import "@/assets/bulma.scss"
import "@fortawesome/fontawesome-free/scss/fontawesome.scss"
import "@fortawesome/fontawesome-free/scss/regular.scss"
import "@fortawesome/fontawesome-free/scss/solid.scss"

import { createApp } from "vue"
import App from "@/App.vue"
import store from "@/store"
import createRouter from "@/router"
import Oruga from "@oruga-ui/oruga-next"
import { bulmaConfig } from "@oruga-ui/theme-bulma"

async function startMockServer() {
  console.log("Mocking server")
  const { worker } = await import("./mocks/browser")
  worker.start({
    onUnhandledRequest(req) {
      console.error("Found an unhandled %s request to %s", req.method, req.url.href)
    },
  })
}

if (import.meta.env.VITE_MOCK_SERVER === "true") {
  startMockServer()
}

createApp(App)
  .use(store)
  .use(createRouter(store))
  .use(Oruga, {
    customIconPacks: {
      fas: {
        sizes: {
          default: "",
          small: "fa-sm",
          medium: "fa-lg",
          large: "fa-2x",
        },
      },
    },
    iconPack: "fas",
    ...bulmaConfig,
  })
  .mount("#app")
