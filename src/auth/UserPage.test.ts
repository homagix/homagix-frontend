import { describe, expect, it, vi } from "vitest"
import { mount } from "@vue/test-utils"
import UserPage from "@/auth/UserPage.vue"

const mockRouter = {
  push: vi.fn(),
  back: vi.fn(),
}

vi.mock("vue-router", () => ({ useRouter: () => mockRouter }))

describe("UserPage", () => {
  it("should render", () => {
    const wrapper = mount(UserPage)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should go to recipies page if button is clicked", () => {
    const wrapper = mount(UserPage, { global: { mocks: { $router: mockRouter } } })
    wrapper.find("#recipes-button").trigger("click")
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith("/recipes")
  })
})
