import { afterEach, describe, expect, it, vi } from "vitest"
import { mockFetch, serverUrl, options } from "./test-utilts"
import { loadDishes, setFavorite } from "@/api/dishes"

describe("api/dishes", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should load the dishes list", async () => {
    mockFetch()
    await loadDishes()
    expect(global.fetch).toHaveBeenCalledWith(serverUrl + "/dishes", options)
  })

  it("should make a dish favorite", async () => {
    mockFetch()
    await setFavorite("4711", true)
    expect(global.fetch).toHaveBeenCalledWith(serverUrl + "/dishes/4711", {
      ...options,
      method: "PATCH",
      body: JSON.stringify({ isFavorite: true }),
    })
  })
})
