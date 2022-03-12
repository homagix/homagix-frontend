import { createApp } from "vue"
import App from "@/App.vue"
import store from "@/store"
import createRouter from "@/router"

createApp(App).use(store).use(createRouter(store)).mount("#app")
