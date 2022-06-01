import { Store } from "@/store";
import { vi } from "vitest"
import { createStore } from "vuex"

export type StoreMockOptions = { actions?: string[]; mutations?: string[] }

export function createStoreMock(state: object = {}, options: StoreMockOptions = {}) {
  function createMocksRecord(names?: string[]) {
    if (!names) {
      return undefined
    }
    return Object.assign({}, ...names.map(name => ({ [name]: vi.fn() })))
  }

  const actionMocks = createMocksRecord(options.actions)
  const mutationMocks = createMocksRecord(options.mutations)
  const store = createStore({
    state() {
      return state
    },
    actions: actionMocks,
    mutations: mutationMocks,
  }) as Store
  return { store, actionMocks, mutationMocks }
}
