import type { GameEngine } from './GameEngine';
export declare abstract class GameEntityBase implements GameEntity {
    game: GameEngine;
    constructor(game: GameEngine);
    remove(): void;
}
