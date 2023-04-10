var o = Object.defineProperty;
var c = (h, t, e) => t in h ? o(h, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : h[t] = e;
var s = (h, t, e) => (c(h, typeof t != "symbol" ? t + "" : t, e), e);
class r {
  constructor(t, e) {
    s(this, "_position");
    s(this, "_size");
    this._position = {
      x: Math.round(t.x),
      y: Math.round(t.y)
    }, this._size = e;
  }
  static use(t, e) {
    return new r(t, e);
  }
  get x() {
    return this._position.x;
  }
  set x(t) {
    this._position.x = Math.round(t);
  }
  get y() {
    return this._position.y;
  }
  set y(t) {
    this._position.y = Math.round(t);
  }
  get topLeft() {
    return {
      x: this.left,
      y: this.top
    };
  }
  get left() {
    return Math.round(this.x - this._size.width / 2);
  }
  get right() {
    return Math.round(this.x + this._size.width / 2);
  }
  get top() {
    return Math.round(this.y - this._size.height / 2);
  }
  get bottom() {
    return Math.round(this.y + this._size.height / 2);
  }
  contains(t) {
    return t.x >= this.left && t.x <= this.right && t.y >= this.top && t.y <= this.bottom;
  }
  overlaps(t) {
    return this.left <= t.right() && this.right >= t.left() && this.top <= t.bottom() && this.bottom >= t.top();
  }
  fillRect(t) {
    t.fillRect(
      this.left,
      this.top,
      this._size.width,
      this._size.height
    );
  }
}
class n {
  constructor(t) {
    s(this, "size");
    this.size = {
      x: 0,
      y: 0
    }, this.width = t.x, this.height = t.y;
  }
  static use(t) {
    return new n(t);
  }
  get width() {
    return this.size.x;
  }
  set width(t) {
    this.size.x = Math.round(t);
  }
  get height() {
    return this.size.y;
  }
  set height(t) {
    this.size.y = Math.round(t);
  }
  matches(t) {
    return this.size.x === t.x && this.size.y === t.y;
  }
}
class d {
  constructor(t) {
    s(this, "isPaused", !0);
    s(this, "lastRenderMs", 0);
    s(this, "canvas");
    s(this, "ctx");
    s(this, "entities", []);
    s(this, "worldSize");
    s(this, "world");
    this.canvas = t, this.ctx = t.getContext("2d"), this.worldSize = n.use({
      x: this.canvas.width,
      y: this.canvas.height
    }), this.world = r.use(
      {
        x: this.worldSize.width / 2,
        y: this.worldSize.height / 2
      },
      this.worldSize
    ), this.step(0);
  }
  /**
   * Pause game play.
   */
  pause() {
    this.isPaused = !0;
  }
  /**
   * Start or resume game play.
   */
  play() {
    this.isPaused = !1;
  }
  /**
   * The program loop.
   */
  step(t) {
    const e = t - this.lastRenderMs;
    if (!this.isPaused) {
      for (const i of this.entities)
        i.update && i.update(e);
      this.ctx.clearRect(0, 0, this.worldSize.width, this.worldSize.height);
      for (const i of this.entities)
        i.draw && i.draw(this.ctx);
    }
    this.lastRenderMs = t, requestAnimationFrame((i) => this.step(i));
  }
  /**
   * Regiser a new entity.
   */
  registerEntity(t) {
    this.entities.length >= 2e3 || this.entities.push(t);
  }
  /**
   * Unregister an existing entity.
   */
  unregisterEntity(t) {
    const e = this.entities.indexOf(t);
    e >= 0 && this.entities.splice(e, 1);
  }
}
class g {
  constructor(t) {
    s(this, "game");
    this.game = t;
  }
  remove() {
    this.game.unregisterEntity(this);
  }
}
class a {
  constructor(t) {
    s(this, "_ms");
    this._ms = t;
  }
  static use(t = 0) {
    return new a(t);
  }
  get ms() {
    return this._ms;
  }
  get seconds() {
    return Math.round(this._ms / 1e3);
  }
  update(t) {
    this._ms += t;
  }
}
class u {
  constructor(t) {
    s(this, "parent");
    s(this, "age", a.use());
    s(this, "deltsMs", 0);
    s(this, "previousState", null);
    s(this, "currentState", null);
    this.parent = t;
  }
  static use(t) {
    return new u(t);
  }
  getStateCallback(t, e) {
    if (e) {
      const i = `${t}${e}`;
      if (i in parent && typeof parent[i] == "function")
        return parent[i];
    }
    return null;
  }
  update(t) {
    this.deltsMs = t, this.age.update(t);
    const e = this.getStateCallback("updateState", this.currentState);
    e && e.call(parent);
  }
  draw(t) {
    const e = this.getStateCallback("drawState", this.currentState);
    e && e.call(parent, t);
  }
  set(t) {
    if (t === this.currentState)
      return;
    this.previousState = this.currentState, this.currentState = t, this.age._ms = 0;
    const e = this.getStateCallback("leaveState", this.previousState);
    e && e.call(parent);
    const i = this.getStateCallback("enterState", this.currentState);
    i && i.call(parent);
  }
}
export {
  a as AgeTrait,
  d as GameEngine,
  g as GameEntityBase,
  r as PositionTrait,
  n as SizeTrait,
  u as StateTrait
};
