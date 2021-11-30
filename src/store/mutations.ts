import { State } from "."
import { AppError } from "../types"

export default {
  SET_ERROR(state: State, error: AppError | null): void {
    state.error = error
  },
}
