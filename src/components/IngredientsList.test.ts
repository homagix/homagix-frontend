import { mount, shallowMount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import IngredientsList from "@/components/IngredientsList.vue"

const newIngredient = { id: "", amount: 3, unit: "Stk", name: "Aubergine" }
const existingIngredient = { id: "123", amount: 8, unit: "L", name: "abc" }

describe("IngredientsList", () => {
  it("should render an empty list without edit mode", () => {
    const wrapper = shallowMount(IngredientsList, { props: { ingredients: [], editable: false } })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should render a list with an item", () => {
    const wrapper = shallowMount(IngredientsList, { props: { ingredients: [existingIngredient], editable: false } })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should render a list with an editable item and with a new item", () => {
    const wrapper = shallowMount(IngredientsList, { props: { ingredients: [existingIngredient], editable: true } })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should add new items", async () => {
    const wrapper = mount(IngredientsList, { props: { ingredients: [existingIngredient], editable: true } })
    await wrapper.vm.$refs.newItem.$emit("input", newIngredient)
    expect(wrapper.emitted().input).toEqual([[[existingIngredient, newIngredient]]])
  })

  it("should change existing items", async () => {
    const wrapper = mount(IngredientsList, { props: { ingredients: [existingIngredient], editable: true } })
    await wrapper.vm.$refs.existingItem[0].$emit("input", { ...existingIngredient, amount: 5 })
    expect(wrapper.emitted().input).toEqual([[[{ ...existingIngredient, amount: 5 }]]])
  })

  it("should remove existing items", async () => {
    const wrapper = mount(IngredientsList, { props: { ingredients: [existingIngredient], editable: true } })
    await wrapper.vm.$refs.existingItem[0].$emit("delete")
    expect(wrapper.emitted().input).toEqual([[[]]])
  })
})
