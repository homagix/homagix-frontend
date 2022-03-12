import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import NotFoundPage from "@/components/NotFoundPage.vue"

describe("NotFoundPage", () => {
  it("should render", () => {
    expect(mount(NotFoundPage).html()).toMatchSnapshot()
  })
})
