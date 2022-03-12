import decodeJWT from "jwt-decode"
import RegisterPage from "@/auth/RegisterPage.vue"
import LoginPage from "@/auth/LoginPage.vue"
import LogoutPage from "@/auth/LogoutPage.vue"
import UserPage from "@/auth/UserPage.vue"
import { MutationType, Store } from "@/store"
import { loginWithCode } from "@/api/user"
import { User } from "@/auth"
import { RouteLocationNormalized, RouteRecordRaw } from "vue-router"

type Token = { sub: string; firstName: string; accessCode: string }

export default function Factory(store: Store) {
  function setTokenCookie(value: string, maxAge: number) {
    document.cookie = `token=${value};path=${import.meta.env.BASE_URL};max-age=${maxAge}`
  }

  function getUserFromCookie() {
    const cookie = document.cookie.match(/token=([\w.]+)/)
    if (cookie?.length === 2) {
      const { sub: id, firstName: name } = decodeJWT(cookie[1]) as Token
      return { id, name } as User
    }
    return null
  }

  function logout() {
    setTokenCookie("", -1)
    store.commit(MutationType.SET_USER, null)
  }

  async function useCode(to: RouteLocationNormalized) {
    try {
      const { token } = await loginWithCode(to.params.id as string, to.params.code as string)
      if (token) {
        setTokenCookie(token, 7200)
        const user = getUserFromCookie()
        user && (user.accessCode = to.params.code as string)
        store.commit(MutationType.SET_USER, user)
        return true
      }
    } catch (error) {
      console.error(error)
    }
    return "/login"
  }

  function getMyUrl() {
    if (store.state.user) {
      return "/user/" + store.state.user.id + "/" + store.state.user.accessCode
    } else {
      return "/login"
    }
  }

  const routes: RouteRecordRaw[] = [
    { path: "/register", component: RegisterPage },
    { path: "/login", component: LoginPage },
    { path: "/logout", component: LogoutPage, beforeEnter: logout },
    { path: "/user/:id/:code", component: UserPage, beforeEnter: useCode },
    { path: "/my", redirect: getMyUrl },
  ]

  function beforeEach() {
    if (!store.state.user) {
      const user = getUserFromCookie()
      if (user) {
        store.commit(MutationType.SET_USER, user)
      }
    }
  }

  return { routes, beforeEach }
}
