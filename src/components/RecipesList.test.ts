import { describe, expect, it, vi } from "vitest"
import { mount } from "@vue/test-utils"
import { createRouterMock } from "../mocks/router"
import { createStoreMock } from "../mocks/store"
import { Dish, Ingredient } from "@/types"
import Oruga from "@oruga-ui/oruga-next"
import RecipesList from "@/components/RecipesList.vue"

const dishes = [
  {
    id: "1",
    name: "dish 1",
    items: [],
    alwaysOnList: false,
    images: ["dish1.jpg"],
    isFavorite: false,
    isEditable: true,
  },
  {
    id: "2",
    name: "dish 2",
    items: [],
    alwaysOnList: false,
    images: ["dish2.jpg"],
    isFavorite: true,
    isEditable: true,
  },
] as Dish[]

const ingredients = [] as Ingredient[]

describe("RecipesList", () => {
  it("should render", () => {
    const router = createRouterMock(RecipesList, ["/wordcloud"])
    const { store } = createStoreMock({ dishes, ingredients }, { actions: ["SET_USER"] })
    const wrapper = mount(RecipesList, {
      global: { plugins: [store, router, Oruga] },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should render a message when there are no items in list", () => {
    const router = createRouterMock(RecipesList, ["/wordcloud"])
    const { store } = createStoreMock({ dishes: [], ingredients }, { actions: ["SET_USER"] })
    const wrapper = mount(RecipesList, {
      global: { plugins: [store, router, Oruga] },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it("should render favorites", () => {
    const router = createRouterMock(RecipesList, ["/wordcloud"])
    const { store } = createStoreMock({ dishes, ingredients }, { actions: ["SET_USER"] })
    const wrapper = mount(RecipesList, {
      global: { plugins: [store, router, Oruga] },
      props: { onlyFavorites: true },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
