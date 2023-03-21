import type { GameEngine } from './GameEngine'

export abstract class GameEntityBase implements GameEntity {
  game: GameEngine

  constructor(game: GameEngine) {
    this.game = game
  }

  remove() {
    this.game.unregisterEntity(this)
  }
}
