import { createRouter, createWebHistory } from "vue-router"
import RecipesList from "@/components/RecipesList.vue"
import Recipe from "@/components/Recipe.vue"
import NotFoundPage from "@/components/NotFoundPage.vue"
import { Store } from "@/store"
import AuthRouter from "@/auth/AuthRouter"

export default (store: Store) => {
  const auth = AuthRouter(store)
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
