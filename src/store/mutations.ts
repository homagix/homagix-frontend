import { State } from "."
import { AppError, Dish } from "../types"

export default {
  SET_ERROR(state: State, error: AppError | null): void {
    state.error = error
  },

  LOADED_DISHES(state: State, payload: { dishes: Dish[] }): void {
    state.dishes = payload.dishes
  },
}
