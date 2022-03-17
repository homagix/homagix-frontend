import { createRouter, createWebHistory } from "vue-router"
import RecipesList from "@/components/RecipesList.vue"
import Recipe from "@/components/Recipe.vue"
import NotFoundPage from "@/components/NotFoundPage.vue"
import { Store } from "@/store"
import { AuthRouterFactory, setCookie, setAuthorizationHeader, setStore } from "@/auth"
import { setAuthorization } from "@/api"

export default (store: Store) => {
  const auth = AuthRouterFactory(
    () => store.state.user,
    [setCookie(7200), setAuthorizationHeader(setAuthorization), setStore(store)]
  )
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      { name: "home", path: "/", redirect: "/recipes" },
      { name: "recipes", path: "/recipes", component: RecipesList },
      { name: "recipe", path: "/recipes/:id", component: Recipe },

      ...auth.routes,

      { path: "/:pathMatch(.*)*", component: NotFoundPage },
    ],
  })

  router.beforeEach(auth.beforeEach)

  return router
}
