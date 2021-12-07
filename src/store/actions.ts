import { Context, MutationType, ActionType } from "."
import { AppError } from "./../types"

export default {
  ERROR_OCCURED(context: Context, error: AppError) {
    context.commit(MutationType.SET_ERROR, error)
  },

  CLEAR_ERROR(context: Context) {
    context.commit(MutationType.SET_ERROR, null)
  },

  async LOAD_DISHES(context: Context) {
    try {
      const response = await fetch("/api/dishes")
      const data = response.headers.get("content-type")?.match(/json/) ? await response.json() : await response.text()
      if (!response.ok) {
        throw { message: response.status + " " + response.statusText, details: data }
      }
      context.commit(MutationType.LOADED_DISHES, data)
    } catch (error) {
      console.error(error)
      const message = "Rezepte konnten nicht geladen werden"
      context.dispatch(ActionType.ERROR_OCCURED, { message, details: error })
    }
  },
}
