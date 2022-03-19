import decodeJWT from "jwt-decode"
import { ActionType, MutationType, Store } from "@/store"

type DecodedToken = { sub: string; firstName: string; accessCode: string }

export function setCookie(maxAge = 7200) {
  return (token?: string) => {
    document.cookie = `token=${token};path=${import.meta.env.BASE_URL};max-age=${token ? maxAge : -1}`
  }
}

export function setAuthorizationHeader(setAuthorization: (authorization?: string) => void) {
  return (token?: string) => setAuthorization(token ? `Bearer ${token}` : undefined)
}

export function setStore(store: Store) {
  return (token?: string) => {
    const prevUserId = store.state.user?.id
    if (token) {
      const { sub: id, firstName: name, accessCode } = decodeJWT(token) as DecodedToken
      store.commit(MutationType.SET_USER, { id, name, accessCode })
    } else {
      store.commit(MutationType.SET_USER, null)
    }
    if (prevUserId !== store.state.user?.id) {
      store.dispatch(ActionType.LOAD_DATA)
    }
  }
}
