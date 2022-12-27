type FetchData = Record<string, unknown>
type FetchOptions = Record<string, string | string[] | Record<string, string>>

const basePath = localStorage.getItem("basePath") || "https://homagix-server.justso.de"

type APIErrorDetails = { status: number; content?: string }

export class APIError extends Error {
  details: APIErrorDetails

  constructor(message: string, details: APIErrorDetails) {
    super(message)
    this.details = details
  }
}

export class UnauthorizedError extends APIError {
  constructor() {
    super("Missing authentication token", { status: 401 })
  }
}

export function getImageUrl(name: string) {
  return basePath + "/images/" + name
}

const defaultHeaders = {
  "Content-Type": "application/json",
} as Record<string, string>

export function setAuthorization(authorization?: string) {
  if (authorization) {
    defaultHeaders.Authorization = authorization
  } else {
    delete defaultHeaders.Authorization
  }
}

export async function fetchFromBackend(method: string, path: string, data: FetchData = {}, options: FetchOptions = {}) {
  options.headers = {
    ...defaultHeaders,
    ...((options.headers || {}) as Record<string, string>),
  }
  options.method = method.toUpperCase()
  if (["POST", "PUT", "PATCH"].includes(options.method) && Object.keys(data).length) {
    options.body = JSON.stringify(data)
  } else if (Object.keys(data).length) {
    path += `?${new URLSearchParams(data as Record<string, string>).toString()}`
  }
  const response = await fetch(basePath + path, options)
  const content = response.headers.get("content-type")?.match(/json/) ? await response.json() : await response.text()
  if (!response.ok) {
    if (response.status === 401) {
      throw new UnauthorizedError()
    }
    const error = new APIError(`${method} ${path} -> ${response.status}`, { status: response.status, content })
    console.error(error)
    throw error
  }
  return content
}
