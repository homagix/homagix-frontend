import { describe, expect, it, vi } from "vitest"
import DishRecipe from "./DishRecipe.vue"
import { mountComponent } from "@/mocks"
import { avocado, guacamole, tomato, tomatoSoup } from "./testdata"

const options = (id: string) => ({
  props: { id },
  state: { dishes: [guacamole, tomatoSoup], ingredients: [avocado, tomato] },
  extraPaths: ["/recipes"],
})

describe("DishRecipe", () => {
  it("should render as expected", () => {
    const { wrapper } = mountComponent(DishRecipe, options(guacamole.id))
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("shows a button which returns back to the list", async () => {
    const { wrapper, router } = mountComponent(DishRecipe, options(guacamole.id))
    router.push = vi.fn()
    const button = wrapper.find("*[icon='list']")
    expect(button.exists()).toBe(true)
    await button.trigger("click")
    expect(router.push).toHaveBeenCalledWith("/recipes")
  })

  it("has an edit button if the current user is authorized", () => {
    const { wrapper } = mountComponent(DishRecipe, options(guacamole.id))
    expect(wrapper.find("*[icon='edit']").exists()).toBe(true)
  })

  it("doesn't have edit, save or cancel buttons if the user is not authorized", () => {
    const { wrapper } = mountComponent(DishRecipe, options(tomatoSoup.id))
    expect(wrapper.find("*[icon='edit']").exists()).toBe(false)
    expect(wrapper.find("*[icon='save']").exists()).toBe(false)
    expect(wrapper.find("*[icon='xmark']").exists()).toBe(false)
  })

  it("doesn't have save or cancel buttons when not in edit mode", () => {
    const { wrapper } = mountComponent(DishRecipe, options(guacamole.id))
    expect(wrapper.find("*[icon='save']").exists()).toBe(false)
    expect(wrapper.find("*[icon='xmark']").exists()).toBe(false)
  })

  it("shows a save and a cancel button in edit mode", async () => {
    const { wrapper } = mountComponent(DishRecipe, options(guacamole.id))
    await wrapper.find("*[icon='edit']").trigger("click")
    expect(wrapper.find("*[icon='save']").exists()).toBe(true)
    expect(wrapper.find("*[icon='xmark']").exists()).toBe(true)
  })
})
