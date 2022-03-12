import { State } from "@/store"
import { AppError, Dish, Ingredient } from "@/types"
import { mutations as auth } from "@/auth"

export default {
  SET_ERROR(state: State, error: AppError | null): void {
    state.error = error
  },

  LOADED_DISHES(state: State, payload: { dishes: Dish[] }): void {
    state.dishes = payload.dishes
  },

  LOADED_INGREDIENTS(state: State, payload: { ingredients: Ingredient[] }): void {
    state.ingredients = payload.ingredients
  },

  ...auth,
}
