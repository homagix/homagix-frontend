import { State } from "@/store"

export type User = {
  id: string
  name: string
  accessCode: string
}

export const state = {
  user: null as User | null,
}

export const mutations = {
  SET_USER(state: State, user: User): void {
    state.user = user
  },
}
