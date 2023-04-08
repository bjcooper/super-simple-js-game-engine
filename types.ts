import type { GameEngine } from "./src/GameEngine"

declare global {

  type UpdateCallback = (deltaMs: number) => void

  type DrawCallback = (ctx: CanvasRenderingContext2D) => void

  interface GameEntity {
    game: GameEngine
    remove: () => void
    update?: UpdateCallback
    draw?: DrawCallback
  }

  type Vector2D = {
    x: number
    y: number
  }

  type BoundingBoxInfo = {
    top: () => number
    bottom: () => number
    left: () => number
    right: () => number
  }

}