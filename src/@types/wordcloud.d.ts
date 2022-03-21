declare module "wordcloud" {
  import wordcloud from "wordcl"
  type WordCloudOptions<WordCloudItem> = {
    list: WordCloudItem[]
    fontFamily?: string
    fontWeight?: string | number
    color?: string
    classes?: string
    minSize?: number
    weightFactor?: () => number
    clearCanvas?: boolean
    backgroundColor?: string

    gridSize?: number
    origin?: [number, number]
    drawOutOfBound?: boolean
    shrinkToFit?: boolean

    drawMask?: boolean
    maskColor?: string
    maskGapWidth?: number

    wait?: number
    abortThreshold?: number
    abort?: () => void

    minRotation?: number
    maxRotation?: number
    rotationSteps?: number

    shuffle?: boolean
    rotateRatio?: number

    shape?: "circle" | "cardioid" | "diamond" | "square" | "triangle-forward" | "triangle" | "pentagon" | "star"
    ellipticity?: number

    hover?: (item: WordCloudItem, dimension: any, event: Event) => void
    click?: (item: WordCloudItem, dimension: any, event: Event) => void
  }
  export default function wordcloud(element: DOMElement, options: WordCloudOptions): void
}
