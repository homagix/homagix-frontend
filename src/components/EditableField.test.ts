import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import EditableField from "@/components/EditableField.vue"

describe("EditableField", () => {
  it("should render non-editable", () => {
    const wrapper = mount(EditableField, { props: { value: "abc", editable: false } })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should render editable", () => {
    const wrapper = mount(EditableField, { props: { value: "abc", editable: true } })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should render numeric fields", () => {
    const wrapper = mount(EditableField, { props: { type: "number", value: 123, editable: true } })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should emit an 'input' event when content was changed", async () => {
    const wrapper = mount(EditableField, { props: { value: "abc", editable: true } })
    const el = wrapper.find("span")
    el.element.innerText = "def"
    await el.trigger("input")
    expect(wrapper.emitted().input).toHaveLength(1)
    expect(wrapper.emitted().input[0]).toEqual(["def"])
  })
})
