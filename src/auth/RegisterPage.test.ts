import { createStore } from "vuex"
import { describe, expect, it, vi } from "vitest"
import { mount } from "@vue/test-utils"
import RegisterPage from "@/auth/RegisterPage.vue"

const mockRouter = {
  push: vi.fn(),
  back: vi.fn(),
}

vi.mock("vue-router", () => ({ useRouter: () => mockRouter }))

function mountComponent() {
  const registerUserAction = vi.fn()
  const store = createStore({
    state() {
      return {}
    },
    actions: {
      REGISTER_USER: registerUserAction,
    },
  })
  const wrapper = mount(RegisterPage, {
    global: {
      plugins: [store],
      mocks: {
        $router: mockRouter,
      },
    },
  })
  return { wrapper, registerUserAction }
}

describe("RegisterPage", () => {
  it("should render", () => {
    const { wrapper } = mountComponent()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should return to the previous page if 'cancel' button is clicked", () => {
    const { wrapper } = mountComponent()
    wrapper.find("#cancel-button").trigger("click")
    expect(wrapper.vm.$router.back).toHaveBeenCalled()
  })

  it("should dispatch REGISTER_USER action if button is clicked", () => {
    const { wrapper, registerUserAction } = mountComponent()
    wrapper.find("input").setValue("luigi")
    wrapper.find("#register-button").trigger("click")
    expect(registerUserAction).toHaveBeenCalledOnce()
    expect(registerUserAction).toHaveBeenCalledWith(expect.any(Object), "luigi")
  })

  it("should got to /my page after registration", () => {
    const { wrapper } = mountComponent()
    wrapper.find("#register-button").trigger("click")
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith("/my")
  })
})
