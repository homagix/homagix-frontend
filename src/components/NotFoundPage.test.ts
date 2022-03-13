import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import NotFoundPage from "@/components/NotFoundPage.vue"
import { createStore } from "vuex"
import Router from "@/router"

const router = Router(createStore({}))

describe("NotFoundPage", () => {
  it("should render", () => {
    expect(mount(NotFoundPage, { global: { plugins: [router]}}).html()).toMatchSnapshot()
  })
})
