import { createRouter, createWebHistory } from "vue-router"
import RecipesList from "@/components/RecipesList.vue"

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { name: "home", path: "/", redirect: "/recipes" },
    { name: "recipes", path: "/recipes", component: RecipesList },
  ],
})
