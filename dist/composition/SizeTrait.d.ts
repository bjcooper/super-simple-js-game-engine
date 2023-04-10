import type { Vector2D } from '..';
export declare class SizeTrait {
    size: Vector2D;
    constructor(initialSize: Vector2D);
    static use(initialSize: Vector2D): SizeTrait;
    get width(): number;
    set width(_width: number);
    get height(): number;
    set height(_height: number);
    matches(other: Vector2D): boolean;
}
