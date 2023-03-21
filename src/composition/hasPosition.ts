import type { hasSize } from './hasSize'

export function hasPosition(
  initialPosition: Vector2D,
  size: ReturnType<typeof hasSize>
) {
  return {
    x: Math.round(initialPosition.x),
    y: Math.round(initialPosition.y),

    topLeft() {
      return {
        x: this.left(),
        y: this.top()
      }
    },

    left() {
      return Math.round(this.x - size.x / 2)
    },

    right() {
      return Math.round(this.x + size.x / 2)
    },

    top() {
      return Math.round(this.y - size.y / 2)
    },

    bottom() {
      return Math.round(this.y + size.y / 2)
    },

    contains(point: Vector2D) {
      return (
        point.x >= this.left() &&
        point.x <= this.right() &&
        point.y >= this.top() &&
        point.y <= this.bottom()
      )
    },

    overlaps(other: BoundingBoxInfo) {
      return (
        this.left() <= other.right() &&
        this.right() >= other.left() &&
        this.top() <= other.bottom() &&
        this.bottom() >= other.top()
      )
    },
    fillRect(ctx: CanvasRenderingContext2D) {
      ctx.fillRect(
        this.left(),
        this.top(),
        size.x,
        size.y
      )
    }
  }
}
