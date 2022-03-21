import { vi } from "vitest"
import "jsdom"

HTMLCanvasElement.prototype.getContext = vi.fn()
