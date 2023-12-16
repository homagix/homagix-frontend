import { http } from "msw"

export const handlers = [
  http.get("/api/dishes", () => {
    return Response.json([
      { id: "1", name: "Pizza", alwaysOnList: true, items: [] },
      { id: "2", name: "Kartoffelauflauf mit grünem Salat", alwaysOnList: false, items: [] },
    ])
  }),
]
