import { Context, MutationType } from "."
import { AppError } from "./../types"

export default {
  ERROR_OCCURED(context: Context, payload: AppError) {
    context.commit(MutationType.SET_ERROR, payload)
  },

  CLEAR_ERROR(context: Context) {
    context.commit(MutationType.SET_ERROR, null)
  },
}
