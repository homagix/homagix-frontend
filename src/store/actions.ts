import { Context, MutationType, ActionType } from "@/store"
import { loadDishes } from "@/api/dishes"
import { AppError } from "@/types"

function catchErrors(func: (context: Context, ...args: unknown[]) => void | Promise<void>, message: string) {
  return async (context: Context, ...args: unknown[]) => {
    try {
      await func(context, ...args)
    } catch (details) {
      context.dispatch(ActionType.ERROR_OCCURED, { message, details })
    }
  }
}

export default {
  ERROR_OCCURED(context: Context, error: AppError) {
    context.commit(MutationType.SET_ERROR, error)
  },

  CLEAR_ERROR(context: Context) {
    context.commit(MutationType.SET_ERROR, null)
  },

  LOAD_DISHES: catchErrors(
    async context => context.commit(MutationType.LOADED_DISHES, await loadDishes()),
    "Rezepte konnten nicht geladen werden"
  ),
}
