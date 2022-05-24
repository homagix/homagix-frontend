import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import AutocompleteField from "./AutocompleteField.vue"

const list = [
  { id: "f", name: "first" },
  { id: "s", name: "second entry" },
  { id: "t", name: "third entry" },
]

describe("AutocompleteField", () => {
  it("should render as expected", async () => {
    const wrapper = mount(AutocompleteField, { props: { id: "field-id", list } })
    const search = wrapper.find("input")
    search.setValue("first")
    await search.trigger("input")
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should show matching entries from list after input", async () => {
    const wrapper = mount(AutocompleteField, { props: { id: "field-id", list } })
    const search = wrapper.find("input")
    await search.setValue("entry")
    await search.trigger("input")
    expect(wrapper.findAll("option").map(option => option.text())).toEqual(["second entry", "third entry"])
  })

  it("should emit a 'change' event when an entry from the list is selected and the enter key is pressed", async () => {
    const wrapper = mount(AutocompleteField, { props: { id: "field-id", list } })
    const search = wrapper.find("input")
    await search.setValue("entry")
    await search.trigger("keyup", { code: "ArrowDown" })
    await search.trigger("keydown", { code: "Enter" })
    expect(wrapper.emitted().change).toEqual([[list[1]]])
    expect(search.element.value).toBe("")
  })

  it("should emit a 'change' event when an element from the list is directly selected by clicking the mouse", async () => {
    const wrapper = mount(AutocompleteField, { props: { id: "field-id", list } })
    const search = wrapper.find("input")
    await search.setValue("entry")
    await wrapper.find("option").trigger("click")
    expect(wrapper.emitted().change).toEqual([[list[1]]])
    expect(search.element.value).toBe("")
  })

  it("should emit a 'change' event when the enter key is pressed after some text is entered", async () => {
    const wrapper = mount(AutocompleteField, { props: { id: "field-id", list } })
    const search = wrapper.find("input")
    await search.setValue("new item")
    await search.trigger("input")
    await search.trigger("keydown", { code: "Enter" })
    expect(wrapper.emitted().change).toEqual([[{ id: "", name: "new item" }]])
    expect(search.element.value).toBe("")
  })
})
