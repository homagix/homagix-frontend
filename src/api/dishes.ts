import { fetchFromBackend } from "."

export async function loadDishes() {
  return await fetchFromBackend("get", "/dishes")
}
