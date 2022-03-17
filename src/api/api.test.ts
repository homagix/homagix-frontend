import { afterEach, beforeEach, describe, it, expect, vi } from "vitest"
import { randomBytes } from "crypto"

const serverUrl = "https://homagix-server.localhost"
localStorage.setItem("basePath", serverUrl)

import { fetchFromBackend, setAuthorization, getImageUrl } from "."

const jsonHeader = {
  "Content-Type": "application/json",
}

const options = {
  headers: jsonHeader,
  method: "get",
}

const testToken = randomBytes(32).toString("hex")

describe("api", () => {
  describe("getImageUrl", () => {
    it("should return the image url", () => {
      expect(getImageUrl("test.jpg")).toBe(`${serverUrl}/images/test.jpg`)
    })
  })

  describe("fetchFromBackend", () => {
    function mockFetch(result: object | string = { content: "abc" }) {
      const contentType = result instanceof Object ? "application/json" : "text/html"
      global.fetch = vi.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          headers: { get: () => contentType },
          json: () => Promise.resolve(result),
          text: () => Promise.resolve(result),
        })
      )
    }

    beforeEach(() => {
      mockFetch()
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it("should call the global fetch function", async () => {
      await fetchFromBackend("get", "/")
      expect(global.fetch).toHaveBeenCalledWith(serverUrl + "/", options)
    })

    it("should return the content as an object", async () => {
      const result = await fetchFromBackend("get", "/")
      expect(result).toEqual({ content: "abc" })
    })

    it("should send query parameters", async () => {
      await fetchFromBackend("get", "/path", { x: "a b c", y: 123 })
      expect(global.fetch).toHaveBeenCalledWith(serverUrl + "/path?x=a+b+c&y=123", options)
    })

    it("should handle non-JSON responses", async () => {
      const html = "<html><body>abc</body></html>"
      mockFetch(html)
      const result = await fetchFromBackend("get", "/index.html")
      expect(global.fetch).toHaveBeenCalledWith(serverUrl + "/index.html", options)
      expect(result).toEqual(html)
    })

    it("should send a JSON body if data is posted", async () => {
      const data = { foo: "bar" }
      await fetchFromBackend("post", "/path", data)
      const expectedOptions = { ...options, body: JSON.stringify(data), method: "post" }
      expect(global.fetch).toHaveBeenCalledWith(serverUrl + "/path", expectedOptions)
    })

    it("should send an authorization header if an authorization is set", async () => {
      const Authorization = `Bearer ${testToken}`
      setAuthorization(Authorization)
      await fetchFromBackend("get", "/")
      const headers = { ...options.headers, Authorization }
      expect(global.fetch).toHaveBeenCalledWith(serverUrl + "/", { ...options, headers })
    })
  })
})
