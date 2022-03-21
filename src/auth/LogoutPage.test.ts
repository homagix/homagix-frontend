import { describe, expect, it, vi } from "vitest"
import LogoutPage from "@/auth/LogoutPage.vue"
import { mountComponent } from "./testdata"

describe("LogoutPage", () => {
  it("should render", () => {
    const { wrapper } = mountComponent(LogoutPage)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should go to recipies page if button is clicked", () => {
    const { wrapper, router } = mountComponent(LogoutPage)
    router.push = vi.fn()
    wrapper.find("#recipes-button").trigger("click")
    expect(router.push).toHaveBeenCalledWith("/recipes")
  })
})
