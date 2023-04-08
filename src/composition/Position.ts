export class Position {
  private _position: Vector2D
  private _size: Size

  constructor(
    initialPosition: Vector2D,
    size: Size
  ) {
    this._position = {
      x: Math.round(initialPosition.x),
      y: Math.round(initialPosition.y)
    }
    this._size = size
  }

  static use(
    initialPosition: Vector2D,
    size: Size
  ) {
    return new Position(initialPosition, size)
  }

  get x() {
    return this._position.x
  }

  set x(_x: number) {
    this._position.x = Math.round(_x)
  }

  get y() {
    return this._position.y
  }

  set y(_y: number) {
    this._position.y = Math.round(_y)
  }


  get topLeft() {
    return {
      x: this.left,
      y: this.top
    }
  }

  get left() {
    return Math.round(this.x - this._size.x / 2)
  }

  get right() {
    return Math.round(this.x + this._size.x / 2)
  }

  get top() {
    return Math.round(this.y - this._size.y / 2)
  }

  get bottom() {
    return Math.round(this.y + this._size.y / 2)
  }

  contains(point: Vector2D) {
    return (
      point.x >= this.left &&
      point.x <= this.right &&
      point.y >= this.top &&
      point.y <= this.bottom
    )
  }

  overlaps(other: BoundingBoxInfo) {
    return (
      this.left <= other.right() &&
      this.right >= other.left() &&
      this.top <= other.bottom() &&
      this.bottom >= other.top()
    )
  }

  fillRect(ctx: CanvasRenderingContext2D) {
    ctx.fillRect(
      this.left,
      this.top,
      this._size.x,
      this._size.y
    )
  }
}
