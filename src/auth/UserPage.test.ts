import { mount } from "@vue/test-utils"
import { describe, expect, it, vi } from "vitest"
import UserPage from "@/auth/UserPage.vue"
import { mountComponent } from "./testdata"

describe("UserPage", () => {
  it("should render", () => {
    const { wrapper } = mountComponent(UserPage)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should go to recipies page if button is clicked", async () => {
    const { wrapper, router } = mountComponent(UserPage)
    router.push = vi.fn()
    await wrapper.find("#recipes-button").trigger("click")
    expect(router.push).toHaveBeenCalledWith("/recipes")
  })
})
