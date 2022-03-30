import { UnauthorizedError } from "@/api"
import type { Dish } from "@/types"
import { Context, MutationType, ActionType } from "@/store"
import { AppError } from "@/types"
import { loadDishes, setFavorite } from "@/api/dishes"
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
      if (details instanceof UnauthorizedError) {
        context.commit(MutationType.SET_USER, null)
        context.commit(MutationType.SET_ERROR, {
          message: "Bitte melde dich zunächst an!",
          link: "/login",
        })
      } else {
        context.dispatch(ActionType.ERROR_OCCURED, { message, details })
      }
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

  LOAD_DATA(context: Context) {
    context.dispatch(ActionType.LOAD_DISHES)
    context.dispatch(ActionType.LOAD_INGREDIENTS)
  },

  LOAD_DISHES: catchErrors(
    async context => context.commit(MutationType.LOADED_DISHES, await loadDishes()),
    "Rezepte konnten nicht geladen werden"
  ),

  LOAD_INGREDIENTS: catchErrors(
    async context => context.commit(MutationType.LOADED_INGREDIENTS, await loadIngredients()),
    "Zutaten konnten nicht geladen werden"
  ),

  REGISTER_USER: catchErrors(async (context, name: string) => {
    context.commit(MutationType.SET_USER, await registerUser(name as string))
  }, "Die Registrierung war leider nicht erfolgreich. Bitte noch einmal probieren!"),

  LOGOUT: catchErrors(async context => {
    await logoutUser()
    context.commit(MutationType.SET_USER, null)
  }, "Logout fehlgeschlagen"),

  TOGGLE_FAVORITE: catchErrors(async (context: Context, dishId: string) => {
    const mapper = async (d: Dish) => (d.id === dishId ? setFavorite(dishId, !d.isFavorite) : d)
    const dishes = await Promise.all(context.state.dishes.map(mapper))
    context.commit(MutationType.LOADED_DISHES, { dishes })
  }, "Rezept konnte nicht als Favorit markiert werden"),
}
