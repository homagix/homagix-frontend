import { fetchFromBackend } from "."

export async function registerUser(firstName: string) {
  return await fetchFromBackend("post", "/accounts", { firstName })
}

export async function loginWithCode(userId: string, accessCode: string) {
  return await fetchFromBackend("get", "/accounts/" + userId + "/access-codes/" + accessCode)
}

export async function logoutUser() {
  return await fetchFromBackend("delete", "/session")
}
