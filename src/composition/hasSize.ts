export function hasSize(initialSize: Vector2D) {
  return {
    x: Math.round(initialSize.x),
    y: Math.round(initialSize.y),

    matches(other: Vector2D) {
      return (this.x === other.x && this.y === other.y)
    }
  }
}
