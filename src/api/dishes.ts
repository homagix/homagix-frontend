type FetchData = Record<string, unknown>
type FetchOptions = Record<string, string | string[] | Record<string, string>>

async function fetchFromBackend(method: string, path: string, data: FetchData = {}, options: FetchOptions = {}) {
  if (!["post", "put", "patch"].includes(method.toLowerCase()) && Object.keys(data).length) {
    options.data = JSON.stringify(data)
    options.headers = { ...((options.headers || {}) as Record<string, string>), ["Content Type"]: "application/json" }
  }
  options.method = method
  const response = await fetch(path, options)
  const content = response.headers.get("content-type")?.match(/json/) ? await response.json() : await response.text()
  if (!response.ok) {
    const error = {
      message: `${method} ${path} -> ${response.status}`,
      details: { request: `${method} ${path}`, status: response.status, content },
    }
    console.error(error)
    throw error
  }
  return content
}

export async function loadDishes() {
  return await fetchFromBackend("get", "/api/dishes")
}