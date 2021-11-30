import {
  Store as VuexStore,
  useStore as baseUseStore,
  CommitOptions,
  createStore,
  DispatchOptions,
  ActionContext,
} from "vuex"
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"
import { AppError } from "../types"
import { InjectionKey } from "vue"

const state = {
  error: null as AppError | null,
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

type StoreFuncs = "getters" | "commit" | "dispatch"
type CommitProp = {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
}
type DispatchProp = {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
}
type GettersProp = {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}
type MutationsProp = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
}

export type Store = Omit<VuexStore<State>, StoreFuncs> & CommitProp & DispatchProp & GettersProp
export type Context = Omit<ActionContext<State, State>, "commit"> & MutationsProp
export const key: InjectionKey<Store> = Symbol()
export function useStore(): Store {
  return baseUseStore(key)
}
