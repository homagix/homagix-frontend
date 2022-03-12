import { createStore } from "vuex"
import { describe, expect, it } from "vitest"
import { mount } from "@vue/test-utils"
import LoginPage from "@/auth/LoginPage.vue"
import Router from "@/router"

const router = Router(createStore({}))

describe("LoginPage", () => {
  it("should render", () => {
    const wrapper = mount(LoginPage, { global: { plugins: [router] } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
