type FetchData = Record<string, string>
type FetchOptions = Record<string, string | string[] | Record<string, string>>

export async function fetchFromBackend(method: string, path: string, data: FetchData = {}, options: FetchOptions = {}) {
  if (["post", "put", "patch"].includes(method.toLowerCase()) && Object.keys(data).length) {
    options.data = JSON.stringify(data)
    options.headers = { ...((options.headers || {}) as Record<string, string>), ["Content Type"]: "application/json" }
  } else if (Object.keys(data).length) {
    path += `?${new URLSearchParams(data).toString()}`
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