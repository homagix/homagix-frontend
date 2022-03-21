import { mount } from "@vue/test-utils"
import { describe, expect, it, vi } from "vitest"
import { createRouterMock } from "../mocks/router"
import NotFoundPage from "@/components/NotFoundPage.vue"
import { createStore } from "vuex"

describe("NotFoundPage", () => {
  it("should render", () => {
    const router = createRouterMock(NotFoundPage)
    const setUserMutation = vi.fn()
    const store = createStore({
      state() {
        return {}
      },
      mutations: { SET_USER: setUserMutation },
    })
    const wrapper = mount(NotFoundPage, {
      global: { plugins: [store, router] },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
