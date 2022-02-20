import { Context, MutationType, ActionType } from "@/store"
import { AppError } from "@/types"
import { loadDishes } from "@/api/dishes"
import { loadIngredients } from "@/api/ingredients"

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

  LOAD_INGREDIENTS: catchErrors(
    async context => context.commit(MutationType.LOADED_INGREDIENTS, await loadIngredients()),
    "Zutaten konnten nicht geladen werden"
  ),
}
