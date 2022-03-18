import RegisterPage from "@/auth/RegisterPage.vue"
import LoginPage from "@/auth/LoginPage.vue"
import LogoutPage from "@/auth/LogoutPage.vue"
import UserPage from "@/auth/UserPage.vue"
import { loginWithCode } from "@/api/user"
import { User } from "@/auth"
import { RouteLocationNormalized, RouteRecordRaw } from "vue-router"

export type TokenReceiverFunction = (token?: string) => void
export type UserGetter = () => User | null

export function AuthRouterFactory(getUserFunc: UserGetter, tokenReceiver: TokenReceiverFunction[] = []) {
  function getUserFromCookie() {
    const cookie = document.cookie.match(/token=([\w.]+)/)
    tokenReceiver.forEach(receiver => receiver(cookie ? cookie[1] : undefined))
  }

  function logout() {
    tokenReceiver.forEach(receiver => receiver())
  }

  async function useCode(to: RouteLocationNormalized) {
    try {
      const { token } = await loginWithCode(to.params.id as string, to.params.code as string)
      if (token) {
        tokenReceiver.forEach(receiver => receiver(token))
        return true
      }
    } catch (error) {
      console.error(error)
    }
    return "/login"
  }

  function getMyUrl() {
    const user = getUserFunc()
    if (user) {
      return "/user/" + user.id + "/" + user.accessCode
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
    getUserFunc() || getUserFromCookie()
  }

  return { routes, beforeEach }
}
