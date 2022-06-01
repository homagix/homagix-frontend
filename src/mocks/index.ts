import { mount, shallowMount } from "@vue/test-utils"
import { createRouterMock } from "./router"
import { createStoreMock, StoreMockOptions } from "./store"
import Oruga from "@oruga-ui/oruga-next"

type MountOptions = {
  shallow?: boolean
  props?: Record<string, any>
  state?: object
  storeOptions?: StoreMockOptions
  extraPaths?: string[]
}

export function mountComponent<C>(component: C, options: MountOptions) {
  const { store, actionMocks, mutationMocks } = createStoreMock(options.state || {}, options.storeOptions || {})
  const router = createRouterMock(component, options.extraPaths || [])
  const m = options.shallow === undefined || options.shallow ? shallowMount : mount
  const wrapper = m(component, { props: options.props || {}, global: { plugins: [store, router, Oruga] } })

  return { wrapper, store, router, actionMocks, mutationMocks }
}
