import { rest } from "msw"

export const handlers = [
  rest.get("/api/dishes", (req, res, ctx) => {
    return res(
      ctx.json([
        { id: "1", name: "Pizza", alwaysOnList: true, items: [] },
        { id: "2", name: "Kartoffelauflauf mit grünem Salat", alwaysOnList: false, items: [] },
      ])
    )
  }),
]
