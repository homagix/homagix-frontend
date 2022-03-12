import { Context, MutationType, ActionType } from "@/store"
import { AppError } from "@/types"
import { loadDishes } from "@/api/dishes"
import { loadIngredients } from "@/api/ingredients"
import { logoutUser, registerUser } from "@/api/user"

type DropFirst<T extends unknown[]> = T extends [unknown, ...infer U] ? U : never

function catchErrors<T extends (context: Context, ...args: never[]) => ReturnType<T>>(
  func: T,
  message: string
): (context: Context, ...funcArgs: DropFirst<Parameters<T>>) => Promise<void> {
  return async (context, ...args) => {
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

  REGISTER_USER: catchErrors(
    async (context, name: string) => context.commit(MutationType.SET_USER, await registerUser(name as string)),
    "Die Registrierung war leider nicht erfolgreich. Bitte noch einmal probieren!"
  ),

  LOGOUT: catchErrors(async context => {
    await logoutUser()
    context.commit(MutationType.SET_USER, null)
  }, "Logout fehlgeschlagen"),
}
