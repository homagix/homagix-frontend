import { mount, shallowMount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import IngredientsList from "@/components/IngredientsList.vue"

const newIngredient = { id: "", amount: 3, unit: "Stk", name: "Aubergine" }
const existingIngredient = { id: "123", amount: 8, unit: "L", name: "abc" }

describe("IngredientsList", () => {
  it("should render an empty list", () => {
    const wrapper = shallowMount(IngredientsList, { props: { ingredients: [] } })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should render a list with an item", () => {
    const wrapper = shallowMount(IngredientsList, { props: { ingredients: [existingIngredient] } })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should render a list with an editable item and with a new item", () => {
    const wrapper = shallowMount(IngredientsList, { props: { ingredients: [existingIngredient] } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
