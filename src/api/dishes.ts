import { Dish } from "@/types"
import { fetchFromBackend } from "."

export async function loadDishes() {
  return await fetchFromBackend("get", "/dishes")
}

export async function setFavorite(dishId: string, isFavorite: boolean) {
  return await fetchFromBackend("PATCH", `/dishes/${dishId}`, { isFavorite })
}

export async function updateDish(dish: Dish) {
  return await fetchFromBackend("PATCH", `/dishes/${dish.id}`, dish)
}
