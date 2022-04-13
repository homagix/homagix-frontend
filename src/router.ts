import { createRouter, createWebHistory } from "vue-router"
import RecipesList from "@/components/RecipesList.vue"
import Recipe from "@/components/Recipe.vue"
import IngredientWordCloud from "@/components/IngredientWordCloud.vue"
import NotFoundPage from "@/components/NotFoundPage.vue"
import { Store } from "@/store"
import { AuthRouterFactory, setCookie, setAuthorizationHeader, setStore } from "@/auth"
import { setAuthorization } from "@/api"

export default (store: Store) => {
  const auth = AuthRouterFactory(
    () => store.state.user,
    [setCookie(7200), setAuthorizationHeader(setAuthorization), setStore(store)]
  )
  const env = import.meta.env
  const router = createRouter({
    history: createWebHistory(env.BASE_URL),
    routes: [
      { name: "home", path: "/", redirect: "/recipes" },
      { name: "recipes", path: "/recipes", component: RecipesList },
      { name: "favorites", path: "/favorites", component: RecipesList, props: { onlyFavorites: true } },
      { name: "recipe", path: "/recipes/:id", component: Recipe },
      { name: "wordcloud", path: "/wordcloud", component: IngredientWordCloud },

      ...auth.routes,

      { path: "/:pathMatch(.*)*", component: NotFoundPage },
    ],
  })

  router.beforeEach(auth.beforeEach)

  return router
}
