import { rest } from "msw"

export const handlers = [
  rest.get("http://localhost:8200/api/dishes", (req, res, ctx) => {
    return res(ctx.json({ dishes: [{ id: 1, name: "Pizza" }]}))
  }),
]
