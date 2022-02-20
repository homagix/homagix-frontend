import { fetchFromBackend } from "."

export async function loadIngredients() {
  return await fetchFromBackend("get", "/ingredients")
}
