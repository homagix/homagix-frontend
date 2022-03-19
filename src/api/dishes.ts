import { fetchFromBackend } from "."

export async function loadDishes() {
  return await fetchFromBackend("get", "/dishes")
}

export async function setFavorite(dishId: string, isFavorite: boolean) {
  return await fetchFromBackend("PATCH", `/dishes/${dishId}`, { isFavorite })
}
