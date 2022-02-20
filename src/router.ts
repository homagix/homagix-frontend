import { createRouter, createWebHistory } from "vue-router"
import RecipesList from "@/components/RecipesList.vue"
import Recipe from "@/components/Recipe.vue"

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { name: "home", path: "/", redirect: "/recipes" },
    { name: "recipes", path: "/recipes", component: RecipesList },
    { name: "recipe", path: "/recipes/:id", component: Recipe },
  ],
})
