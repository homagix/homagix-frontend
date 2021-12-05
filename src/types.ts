export type AppError = {
  message: string
  details?: unknown
}

export type User = {
  id: string
  firstName: string
}

export type Item = {
  id: string
  amount: number
}

export type Dish = {
  id: string
  name: string
  recipe?: string
  source?: string
  last?: string
  items: Item[]
}

export type Proposal = {
  date: string
  dishId: string
  served: boolean
}

export type Ingredient = {
  id: string
  name: string
  unit: string
  group: string
}

export type CompleteItem = {
  id: string
  name: string
  unit: string
  group: {
    id: string
    title: string
    order: number
  }
  amount: number
  originalAmount?: number
}

export type Unit = {
  id: string
  name: string
  increment: number
}

export type ItemGroup = {
  order: number
  title: string
}
