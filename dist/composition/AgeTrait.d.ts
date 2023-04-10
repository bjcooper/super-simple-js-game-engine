export declare class AgeTrait {
    _ms: number;
    constructor(initialAgeMs: number);
    static use(initialAgeMs?: number): AgeTrait;
    get ms(): number;
    get seconds(): number;
    update(deltaMs: number): void;
}
