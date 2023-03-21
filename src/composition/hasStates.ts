import { hasAge } from './hasAge'

export function hasStates<S extends string>(parent: object) {
  function getStateCallback(baseName: string, state: null | S) {
    if (state) {
      const cb = `${baseName}${state}`
      if (cb in parent && typeof parent[cb as keyof typeof parent] === 'function') {
        return parent[cb as keyof typeof parent] as () => void
      }
    }
    return null
  }

  return {
    age: hasAge(),
    deltsMs: 0,
    previousState: null as null | S,
    currentState: null as null | S,

    update(deltaMs: number) {
      this.deltsMs = deltaMs
      this.age.update(deltaMs)
      const cb = getStateCallback('updateState', this.currentState)
      if (cb) {
        cb.call(parent)
      }
    },

    draw(ctx: CanvasRenderingContext2D) {
      const cb = getStateCallback('drawState', this.currentState)
      if (cb) {
        (cb as DrawCallback).call(parent, ctx)
      }
    },

    set(newState: null | S) {
      // If we're already in the given state, don't do anything.
      if (newState === this.currentState) {
        return
      }

      // Update our state variables.
      this.previousState = this.currentState
      this.currentState = newState
      this.age._ms = 0

      // Invoke leave/enter hooks.
      const leaveCb = getStateCallback('leaveState', this.previousState)
      if (leaveCb) {
        leaveCb.call(parent)
      }

      const enterCb = getStateCallback('enterState', this.currentState)
      if (enterCb) {
        enterCb.call(parent)
      }
    }
  }
}
