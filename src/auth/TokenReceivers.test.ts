import { Store } from "@/store"
import { token } from "./testdata"
import { setCookie, setAuthorizationHeader, setStore } from "."
import { expect, it, describe, vi } from "vitest"

describe("setCookie()", () => {
  it("should set a cookie", () => {
    const func = setCookie()
    func(token)
    expect(document.cookie).toBe(`token=${token}`)
  })

  it("should expire the cookie", () => {
    document.cookie = `token=${token};path=/;max-age=7200`
    const func = setCookie()
    func()
    expect(document.cookie).toBe("")
  })

  it("should use the 'maxAge' parameter", async () => {
    const func = setCookie(1)
    func(token)
    expect(document.cookie).toBe(`token=${token}`)
    await new Promise(resolve => setTimeout(resolve, 1100))
    expect(document.cookie).toBe("")
  })
})

describe("setAuthorization()", () => {
  it("should set the authorization header", () => {
    const setAuthorization = vi.fn()
    const func = setAuthorizationHeader(setAuthorization)
    func(token)
    expect(setAuthorization).toHaveBeenCalledWith("Bearer " + token)
  })

  it("should remove the authorization header", () => {
    const setAuthorization = vi.fn()
    const func = setAuthorizationHeader(setAuthorization)
    func()
    expect(setAuthorization).toHaveBeenCalledWith(undefined)
  })
})

describe("setStore()", () => {
  function createStore() {
    return {
      commit: vi.fn(),
    }
  }

  it("should set the user in the store", () => {
    const store = createStore()
    const func = setStore(store as unknown as Store)
    func(token)
    expect(store.commit).toHaveBeenCalledWith("SET_USER", { id: "123", name: "abc" })
  })

  it("should remove the user from the store", () => {
    const store = createStore()
    const func = setStore(store as unknown as Store)
    func()
    expect(store.commit).toHaveBeenCalledWith("SET_USER", null)
  })
})
