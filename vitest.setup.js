import { vi } from "vitest"
import "happy-dom"

HTMLCanvasElement.prototype.getContext = vi.fn()
