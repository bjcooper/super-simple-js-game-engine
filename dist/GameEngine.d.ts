import type { GameEntity } from '.';
import { PositionTrait } from './composition/PositionTrait';
import { SizeTrait } from './composition/SizeTrait';
export declare class GameEngine {
    protected isPaused: boolean;
    protected lastRenderMs: number;
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    entities: GameEntity[];
    worldSize: SizeTrait;
    world: PositionTrait;
    constructor(canvas: HTMLCanvasElement);
    /**
     * Pause game play.
     */
    pause(): void;
    /**
     * Start or resume game play.
     */
    play(): void;
    /**
     * The program loop.
     */
    protected step(timeMs: DOMHighResTimeStamp): void;
    /**
     * Regiser a new entity.
     */
    registerEntity(entity: GameEntity): void;
    /**
     * Unregister an existing entity.
     */
    unregisterEntity(entity: GameEntity): void;
}
