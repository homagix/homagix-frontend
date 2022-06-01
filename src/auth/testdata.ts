import type { User } from "."
import { mountComponent as mount } from "@/mocks"

export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJmaXJzdE5hbWUiOiJhYmMiLCJpYXQiOjE2NDY5Nzg0NTUsImV4cCI6MTY0NzA2NDg1NX0.kClNCHxRnm_rvNpkdwdHgDsVebJfOzZ66Z_5epxkKNU"

export const user: User = { id: "123", name: "abc", accessCode: "456" }

export function mountComponent<C>(component: C, shallow = true) {
  const { wrapper, router, store, actionMocks, mutationMocks } = mount(component, {
    shallow,
    extraPaths: ["/my", "/register"],
    storeOptions: { actions: ["REGISTER_USER"] },
  })
  return { wrapper, router, store, actionMocks, mutationMocks }
}
