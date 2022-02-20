export type AppError = {
  message: string
  details?: unknown
}

export type Item = {
  id: string
  amount: number
}

export type Dish = {
  id: string
  name: string
  image: string
  recipe?: string
  source?: string
  last?: string
  items: Item[]
  alwaysOnList: boolean
}

export type Ingredient = {
  id: string
  amount: number
  unit: string
  name: string
}
