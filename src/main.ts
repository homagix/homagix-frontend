import { createApp } from "vue"
import App from "@/App.vue"
import store from "@/store"
import createRouter from "@/router"
import Oruga from '@oruga-ui/oruga-next'
import { bulmaConfig } from "@oruga-ui/theme-bulma"
// Could be replaced in the future with a sass import
import "@oruga-ui/theme-bulma/dist/bulma.css"
import "@fortawesome/fontawesome-free/scss/fontawesome.scss"
import "@fortawesome/fontawesome-free/scss/regular.scss"
import "@fortawesome/fontawesome-free/scss/solid.scss"

if (import.meta.env.MODE === "development") {
  const { worker } = await import("./mocks/browser")
  worker.start({
    onUnhandledRequest(req) {
      console.error("Found an unhandled %s request to %s", req.method, req.url.href)
    },
  })
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
