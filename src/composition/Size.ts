export class Size {
  size: Vector2D

  constructor(initialSize: Vector2D) {
    this.size = {
      x: Math.round(initialSize.x),
      y: Math.round(initialSize.y),
    }
  }

  static use(initialSize: Vector2d) {
    return new Size(initialSize)
  }

  get width() {
    return this.size.x
  }

  get height() {
    return this.size.y
  }

  matches(other: Vector2D) {
    return (this.size.x === other.x && this.size.y === other.y)
  }
}
