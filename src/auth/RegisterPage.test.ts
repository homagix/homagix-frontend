import { describe, expect, it, vi } from "vitest"
import RegisterPage from "@/auth/RegisterPage.vue"
import { mountComponent } from "./testdata"

describe("RegisterPage", () => {
  it("should render", () => {
    const { wrapper } = mountComponent(RegisterPage)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should return to the previous page if 'cancel' button is clicked", () => {
    const { wrapper, router } = mountComponent(RegisterPage)
    router.back = vi.fn()
    wrapper.find("#cancel-button").trigger("click")
    expect(router.back).toHaveBeenCalled()
  })

  it("should dispatch REGISTER_USER action if button is clicked", () => {
    const { wrapper, actionMocks } = mountComponent(RegisterPage)
    wrapper.find("input").setValue("luigi")
    wrapper.find("#register-button").trigger("click")
    expect(actionMocks.REGISTER_USER).toHaveBeenCalledOnce()
    expect(actionMocks.REGISTER_USER).toHaveBeenCalledWith(expect.any(Object), "luigi")
  })

  it("should got to /my page after registration", async () => {
    const { wrapper, router } = mountComponent(RegisterPage)
    router.push = vi.fn()
    await wrapper.find("#register-button").trigger("click")
    expect(router.push).toHaveBeenCalledWith("/my")
  })
})
