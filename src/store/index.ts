import { Store, useStore as baseUseStore, createStore, ActionContext } from "vuex"
import mutations from "@/store/mutations"
import actions from "@/store/actions"
import getters from "@/store/getters"
import { AppError, Dish } from "@/types"
import { InjectionKey } from "vue"

const state = {
  error: null as AppError | null,
  dishes: [] as Dish[],
}

const store = createStore({
  strict: import.meta.env.NODE_ENV !== "production",
  state,
  mutations,
  actions,
  getters,
})

function listKeys(obj: object) {
  return Object.assign({}, ...Object.keys(obj).map(key => ({ [key]: key })))
}

export default store
export type State = typeof state
export type Mutations = typeof mutations
export type Actions = typeof actions
export type Getters = typeof getters
export const MutationType = listKeys(mutations) as Record<keyof Mutations, keyof Mutations>
export const ActionType = listKeys(actions) as Record<keyof Actions, keyof Actions>

type MutationsProp = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
}

export type Context = Omit<ActionContext<State, State>, "commit"> & MutationsProp
export const key: InjectionKey<Store<State>> = Symbol()
export function useStore(): Store<State> {
  return baseUseStore(key)
}
