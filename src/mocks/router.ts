import { defineComponent } from "vue"
import { createWebHistory } from "vue-router"
import { createRouter } from "vue-router"

export function createRouterMock(component: ReturnType<typeof defineComponent>, extraPaths: string[] = []) {
  const history = createWebHistory()
  const routes = ["/", ...extraPaths].map(path => ({ path, component }))
  return createRouter({ history, routes })
}
