import { vi } from "vitest"
import { createStore } from "vuex"
import { mount } from "@vue/test-utils"
import { createRouterMock } from "../mocks/router"
import type { User } from "."

export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJmaXJzdE5hbWUiOiJhYmMiLCJpYXQiOjE2NDY5Nzg0NTUsImV4cCI6MTY0NzA2NDg1NX0.kClNCHxRnm_rvNpkdwdHgDsVebJfOzZ66Z_5epxkKNU"

export const user: User = { id: "123", name: "abc", accessCode: "456" }

export function mountComponent<C>(component: C) {
  const router = createRouterMock(component, ["/my", "/register"])
  const registerUserAction = vi.fn()
  const store = createStore({
    state() {
      return {}
    },
    actions: {
      REGISTER_USER: registerUserAction,
    },
  })
  const wrapper = mount(component, { global: { plugins: [store, router] } })
  return { wrapper, registerUserAction, router }
}
