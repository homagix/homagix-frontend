import { DOMWrapper, mount, shallowMount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import IngredientsListRow from "@/components/IngredientsListRow.vue"

const newIngredient = { id: "", amount: 3, name: "def", unit: "Stk" }
const existingIngredient = { id: "123", amount: 2, name: "abc", unit: "ml" }

describe("IngredientsListRow", () => {
  describe("in view mode", () => {
    it("should render", () => {
      const wrapper = shallowMount(IngredientsListRow, { props: { ingredient: existingIngredient, editable: false } })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe("in edit mode", () => {
    it("should render in editable mode", () => {
      const wrapper = mount(IngredientsListRow, { props: { ingredient: existingIngredient, editable: true } })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it("should render a delete button if requested", () => {
      const wrapper = mount(IngredientsListRow, {
        props: { ingredient: existingIngredient, editable: true, deletable: true },
      })
      expect(wrapper.html()).toMatchSnapshot()
    })

    describe("with existing items", async () => {
      const wrapper = mount(IngredientsListRow, {
        props: { ingredient: existingIngredient, editable: true, deletable: true },
      })
      const [amountField, nameField] = wrapper.findAll("span") as DOMWrapper<HTMLElement>[]

      it("should emit an 'input' event when the amount is modified", async () => {
        amountField.element.innerText = "5"
        await amountField.trigger("input")
        expect(wrapper.emitted().input).toEqual([[{ ...existingIngredient, amount: 5 }]])
      })

      it("should not allow to edit the unit field", () => {
        expect(wrapper.find("select").element.disabled).toBe(true)
      })

      it("should not let the name be edited", () => {
        expect(nameField.element.attributes.getNamedItem("contentEditable")?.value).toBe("false")
      })

      it("should allow to remove items", async () => {
        await wrapper.find(".delete").trigger("click")
        expect(wrapper.emitted().delete).toEqual([[existingIngredient]])
      })
    })

    describe("with a new item", () => {
      const wrapper = mount(IngredientsListRow, { props: { ingredient: newIngredient, editable: true } })
      const unitField = wrapper.find("select")

      it("should show editable fields", () => {
        expect(wrapper.html()).toMatchSnapshot()
      })

      it("should allow to select the unit", () => {
        expect(unitField.element.disabled).toBe(false)
      })

      it("should emit an 'input' event when the unit is modified", async () => {
        unitField.element.selectedIndex = 2
        unitField.trigger("input")
        expect(wrapper.emitted().input).toHaveLength(1)
        expect(wrapper.emitted().input[0]).toEqual([{ id: "", amount: 3, name: "def", unit: "ml" }])
      })
    })
  })
})
