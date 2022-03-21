import { describe, expect, it } from "vitest"
import LoginPage from "@/auth/LoginPage.vue"
import { mountComponent } from "./testdata"

describe("LoginPage", () => {
  it("should render", () => {
    const { wrapper } = mountComponent(LoginPage)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
