import { Store } from "@/store"
import { createStore } from "vuex"
import { describe, expect, it, vi } from "vitest"
import AuthRouter from "@/auth/AuthRouter"
import { RouteRecordRaw, RouteLocationNormalized } from "vue-router"

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJmaXJzdE5hbWUiOiJhYmMiLCJpYXQiOjE2NDY5Nzg0NTUsImV4cCI6MTY0NzA2NDg1NX0.kClNCHxRnm_rvNpkdwdHgDsVebJfOzZ66Z_5epxkKNU"

function getRoute(path: string, store: Store) {
  const authRouter = AuthRouter(store)
  const route = authRouter.routes.find(r => r.path === path) as RouteRecordRaw
  expect(route).toBeDefined()
  return { route, authRouter }
}

type FetchFunction = (input: RequestInfo, init?: RequestInit | undefined) => Promise<Response>

function mockFetch(status: number, result: object) {
  const fetch = () =>
    Promise.resolve({
      ok: status < 400,
      headers: { get: () => "application/json" },
      json: () => Promise.resolve(result),
    })
  global.fetch = vi.fn(fetch) as unknown as FetchFunction
}

describe("AuthRouter", () => {
  it("should return an object containing the auth routes", () => {
    const store = createStore({}) as Store
    const authRouter = AuthRouter(store)
    expect(authRouter).toHaveProperty("routes")
    expect(authRouter.routes).toBeInstanceOf(Array)
    expect(authRouter.routes.length).toBeGreaterThan(0)
    expect(authRouter.routes.some(r => !r.path)).toBeFalsy()
  })

  it("should return a beforeEach function", () => {
    const store = createStore({}) as Store
    const authRouter = AuthRouter(store)
    expect(authRouter).toHaveProperty("beforeEach")
    expect(authRouter.beforeEach).toBeInstanceOf(Function)
  })

  it("should take the user from the cookie token if beforeEach() is called", () => {
    const setUserMutation = vi.fn()
    const store = createStore({ mutations: { SET_USER: setUserMutation } }) as Store
    const authRouter = AuthRouter(store)
    document.cookie = "token=" + token
    authRouter.beforeEach()
    expect(setUserMutation).toHaveBeenCalledWith(expect.any(Object), { id: "123", name: "abc" })
  })

  describe("using the auth code", () => {
    function setupTest() {
      const setUserMutation = vi.fn()
      const store = createStore({ mutations: { SET_USER: setUserMutation } }) as Store
      const { route, authRouter } = getRoute("/user/:id/:code", store)
      const beforeEnter = route.beforeEnter as (to: RouteLocationNormalized) => Promise<string | void>
      return { store, authRouter, beforeEnter, setUserMutation }
    }

    it("should set the user into the store", async () => {
      const { beforeEnter, setUserMutation } = setupTest()
      mockFetch(200, { token })
      const result = await beforeEnter({ params: { id: "123", code: "456" } } as unknown as RouteLocationNormalized)
      expect(result).toBe(true)
      expect(setUserMutation).toHaveBeenCalledWith(expect.any(Object), { accessCode: "456", id: "123", name: "abc" })
    })

    it("should redirect to /login if authentication code is invalid", async () => {
      const originalErrorLog = console.error
      console.error = () => undefined
      const { beforeEnter, setUserMutation } = setupTest()
      mockFetch(403, { error: "invalid code" })
      const result = await beforeEnter({ params: { id: "123", code: "789" } } as unknown as RouteLocationNormalized)
      expect(result).toBe("/login")
      expect(setUserMutation).not.toHaveBeenCalled()
      console.error = originalErrorLog
    })
  })

  describe("using the /my route", () => {
    it("should redirect to auth code route if user is logged in", () => {
      const store = createStore({ state: () => ({ user: { id: "123", accessCode: "456" } }) }) as Store
      const { route } = getRoute("/my", store)
      const redirect = route.redirect as () => string
      expect(redirect).toBeDefined()
      expect(redirect()).toBe("/user/123/456")
    })

    it("should redirect to /login if user is not logged in", () => {
      const store = createStore({ state: () => ({ user: null }) }) as Store
      const { route } = getRoute("/my", store)
      const redirect = route.redirect as () => string
      expect(redirect).toBeDefined()
      expect(redirect()).toBe("/login")
    })
  })

  it("should expire the cookie and remove the user from the store if /logout is called", async () => {
    const setUserMutation = vi.fn()
    const store = createStore({
      mutations: { SET_USER: setUserMutation },
      state: () => ({ user: { id: "123", accessCode: "456" } }),
    }) as Store
    const { route } = getRoute("/logout", store)
    const beforeEnter = route.beforeEnter as (to: RouteLocationNormalized) => Promise<string | void>
    await beforeEnter({} as RouteLocationNormalized)
    expect(document.cookie).toBe("")
    expect(setUserMutation).toHaveBeenCalledWith(expect.any(Object), null)
  })
})
