import { describe, expect, it, vi } from "vitest"
import type { RouteRecordRaw, RouteLocationNormalized } from "vue-router"
import type { User, TokenReceiverFunction } from "."
import { AuthRouterFactory } from "."
import { user, token } from "./testdata"

function getRoute(path: string, user: User | null = null, receivers: TokenReceiverFunction[] = []) {
  const authRouter = AuthRouterFactory(() => user, receivers)
  const route = authRouter.routes.find(r => r.path === path) as RouteRecordRaw
  expect(route).toBeDefined()
  return { route, authRouter }
}

function mockFetch(status: number, result: object) {
  const fetch = () =>
    Promise.resolve({
      ok: status < 400,
      headers: { get: () => "application/json" },
      json: () => Promise.resolve(result),
    })
  global.fetch = vi.fn(fetch) as unknown as typeof global.fetch
}

describe("AuthRouter", () => {
  it("should return an object containing the auth routes", () => {
    const authRouter = AuthRouterFactory(() => null, [])
    expect(authRouter).toHaveProperty("routes")
    expect(authRouter.routes).toBeInstanceOf(Array)
    expect(authRouter.routes.length).toBeGreaterThan(0)
    expect(authRouter.routes.some(r => !r.path)).toBeFalsy()
  })

  it("should return a beforeEach function", () => {
    const authRouter = AuthRouterFactory(() => null)
    expect(authRouter).toHaveProperty("beforeEach")
    expect(authRouter.beforeEach).toBeInstanceOf(Function)
  })

  it("should take the user from the cookie token if no current user and beforeEach() is called", () => {
    const receiver = vi.fn()
    const authRouter = AuthRouterFactory(() => null, [receiver])
    document.cookie = "token=" + token
    authRouter.beforeEach()
    expect(receiver).toHaveBeenCalledWith(token)
  })

  it("should call each token receiver functions with the new token", () => {
    const callbacks = [vi.fn(), vi.fn()]
    const authRouter = AuthRouterFactory(() => null, callbacks)
    document.cookie = "token=" + token
    authRouter.beforeEach()
    expect(callbacks.map(callback => callback.mock.calls)).toEqual([[[token]], [[token]]])
  })

  describe("using the auth code", () => {
    function setupTest() {
      const receiver = vi.fn()
      const { route, authRouter } = getRoute("/user/:id/:code", null, [receiver])
      const beforeEnter = route.beforeEnter as (to: RouteLocationNormalized) => Promise<string | void>
      return { authRouter, beforeEnter, receiver }
    }

    it("should set the user into the store", async () => {
      const { beforeEnter, receiver } = setupTest()
      mockFetch(200, { token })
      const result = await beforeEnter({ params: { id: "123", code: "456" } } as unknown as RouteLocationNormalized)
      expect(result).toBe(true)
      expect(receiver).toHaveBeenCalledWith(token)
    })

    it("should redirect to /login if authentication code is invalid", async () => {
      const originalErrorLog = console.error
      console.error = () => undefined
      const { beforeEnter, receiver } = setupTest()
      mockFetch(403, { error: "invalid code" })
      const result = await beforeEnter({ params: { id: "123", code: "789" } } as unknown as RouteLocationNormalized)
      expect(result).toBe("/login")
      expect(receiver).not.toHaveBeenCalled()
      console.error = originalErrorLog
    })
  })

  describe("using the /my route", () => {
    function setupTest(user: User | null = null, receivers: TokenReceiverFunction[] = []) {
      const { route } = getRoute("/my", user, receivers)
      expect(route.redirect).toBeDefined()
      return route.redirect as () => string
    }

    it("should redirect to auth code route if user is logged in", () => {
      const redirect = setupTest(user)
      expect(redirect()).toBe("/user/123/456")
    })

    it("should redirect to /login if user is not logged in", () => {
      const redirect = setupTest()
      expect(redirect()).toBe("/login")
    })
  })

  it("should call the receiver function without token if /logout is called", async () => {
    const receiver = vi.fn()
    const { route } = getRoute("/logout", user, [receiver])
    const beforeEnter = route.beforeEnter as (to: RouteLocationNormalized) => Promise<string | void>
    await beforeEnter({} as RouteLocationNormalized)
    expect(receiver).toBeCalledWith()
  })
})
