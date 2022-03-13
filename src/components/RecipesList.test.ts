import { describe, expect, it, vi } from "vitest"
import { mount } from "@vue/test-utils"
import RecipesList from "@/components/RecipesList.vue"
import { createStore } from "vuex"
import { Dish } from "@/types"
import Oruga from '@oruga-ui/oruga-next'

const testDishes = [
  { id: "1", name: "dish 1", items: [], alwaysOnList: false, image: "dish1.jpg" },
  { id: "2", name: "dish 2", items: [], alwaysOnList: false, image: "dish2.jpg" },
] as Dish[]

vi.mock("vue-router", () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

describe("RecipesList", () => {
  it("should render", () => {
    const store = createStore({
      state() {
        return { dishes: testDishes }
      },
    })
    const wrapper = mount(RecipesList, {
      global: {
        plugins: [store, Oruga],
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
