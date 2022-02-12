import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import RecipesList from '@/components/RecipesList.vue'
import { createStore } from 'vuex'
import { Dish } from '@/types'

const testDishes = [
  { id: "1", name: "dish 1", items: [], alwaysOnList: false },
  { id: "2", name: "dish 2", items: [], alwaysOnList: false }
] as Dish[]

describe("RecipesList", () => {
  it("should render", () => {
    const store = createStore({
      state() {
        return { dishes: testDishes }
      }
    })
    const wrapper = mount(RecipesList, { global: {
      plugins: [store]
    } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
