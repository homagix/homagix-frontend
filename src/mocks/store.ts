import { vi } from "vitest"
import { createStore } from "vuex"

export function createStoreMock(state: object = {}, options: { actions?: string[]; mutations?: string[] } = {}) {
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
  })
  return { store, actionMocks, mutationMocks }
}
