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
  recipe?: string
  source?: string
  last?: string
  items: Item[]
  alwaysOnList: boolean
}
