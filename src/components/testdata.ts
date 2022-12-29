import { Dish, Ingredient } from "@/types"

export const avocado = { id: "42", name: "Avocado", unit: "Stk" } as Ingredient
export const tomato = { id: "43", name: "Tomate", unit: "Stk" } as Ingredient

export const guacamole: Dish = {
  id: "5",
  name: "Guacamole",
  items: [
    { id: avocado.id, amount: 2 },
    { id: tomato.id, amount: 2 },
  ],
  alwaysOnList: false,
  images: ["guacamole.jpg"],
  isFavorite: false,
  isEditable: true,
}

export const tomatoSoup: Dish = {
  id: "7",
  name: "Tomatensuppe",
  items: [{ id: tomato.id, amount: 4 }],
  alwaysOnList: false,
  images: ["tomatoSoup.jpg"],
  isFavorite: false,
  isEditable: false,
}
