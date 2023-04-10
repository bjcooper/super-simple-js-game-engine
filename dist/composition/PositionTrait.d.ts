import type { BoundingBoxInfo, Vector2D } from '..';
import type { SizeTrait } from './SizeTrait';
export declare class PositionTrait {
    private _position;
    private _size;
    constructor(initialPosition: Vector2D, size: SizeTrait);
    static use(initialPosition: Vector2D, size: SizeTrait): PositionTrait;
    get x(): number;
    set x(_x: number);
    get y(): number;
    set y(_y: number);
    get topLeft(): {
        x: number;
        y: number;
    };
    get left(): number;
    get right(): number;
    get top(): number;
    get bottom(): number;
    contains(point: Vector2D): boolean;
    overlaps(other: BoundingBoxInfo): boolean;
    fillRect(ctx: CanvasRenderingContext2D): void;
}
