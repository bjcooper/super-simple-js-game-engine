export class Age {
  private _ms: number;

  constructor(initialAgeMs: number) {
    this._ms = initialAgeMs
  }

  static use(initialAgeMs = 0) {
    return new Age(initialAgeMs)
  }

  get ms() {
    return this._ms
  }

  get seconds() {
    return Math.round(this._ms / 1000)
  }

  update(deltaMs: number) {
    this._ms += deltaMs
  }
}