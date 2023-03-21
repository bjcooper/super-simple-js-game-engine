export function hasAge(initialAgeMs = 0) {
  return {
    _ms: initialAgeMs,
    ms() {
      return this._ms
    },
    seconds() {
      return Math.round(this._ms / 1000)
    },
    update(deltaMs: number) {
      this._ms += deltaMs
    }
  }
}
