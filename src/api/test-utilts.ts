import { vi } from "vitest"
import { randomBytes } from "crypto"

export const serverUrl = "https://homagix-server.localhost"
localStorage.setItem("basePath", serverUrl)

export function mockFetch(result: object | string = { content: "abc" }) {
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

export const jsonHeader = {
  "Content-Type": "application/json",
}

export const options = {
  headers: jsonHeader,
  method: "GET",
}

export const testToken = randomBytes(32).toString("hex")
