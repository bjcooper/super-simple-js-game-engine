import { AgeTrait } from './AgeTrait';
export declare class StateTrait<S extends string> {
    parent: object;
    age: AgeTrait;
    deltsMs: number;
    previousState: null | S;
    currentState: null | S;
    constructor(parent: object);
    static use<S extends string>(parent: object): StateTrait<S>;
    protected getStateCallback(baseName: string, state: null | S): (() => void) | null;
    update(deltaMs: number): void;
    draw(ctx: CanvasRenderingContext2D): void;
    set(newState: null | S): void;
}
