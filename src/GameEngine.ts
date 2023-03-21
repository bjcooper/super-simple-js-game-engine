import { hasSize } from './composition/hasSize'
import { hasPosition } from './composition/hasPosition'

export class GameEngine {
  protected isPaused = true
  protected lastRenderMs = 0
  protected canvas: HTMLCanvasElement
  protected ctx: CanvasRenderingContext2D
  entities: GameEntity[] = []
  worldSize
  world

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    this.worldSize = hasSize({ 
      x: this.canvas.width,
      y: this.canvas.height
    })
    this.world = hasPosition(
      {
        x: this.worldSize.x / 2,
        y: this.worldSize.y / 2
      },
      this.worldSize
    )
    this.step(0)
  }

  /**
   * Pause game play.
   */
  public pause() {
    this.isPaused = true
  }

  /**
   * Start or resume game play.
   */
  public play() {
    this.isPaused = false
  }

  /**
   * The program loop.
   */
  protected step(timeMs: DOMHighResTimeStamp) {
    const deltaMs = timeMs - this.lastRenderMs
    if (!this.isPaused) {
      // Update loop.
      for (const entity of this.entities) {
        if (entity.update) {
          entity.update(deltaMs)
        }
      }

      // Draw loop.
      this.ctx.clearRect(0, 0, this.worldSize.x, this.worldSize.y)
      for (const entity of this.entities) {
        if (entity.draw) {
          entity.draw(this.ctx)
        }
      }
    }
    this.lastRenderMs = timeMs
    requestAnimationFrame(time => this.step(time))
  }

  /**
   * Regiser a new entity.
   */
  public registerEntity(entity: GameEntity) {
    if (this.entities.length >= 2000) {
      return
    }
    this.entities.push(entity)
  }

  /**
   * Unregister an existing entity.
   */
  public unregisterEntity(entity: GameEntity) {
    const index = this.entities.indexOf(entity)
    if (index >= 0) {
      this.entities.splice(index, 1)
    }
  }
}
