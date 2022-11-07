import { Serializer } from './Serializer';
export declare class Difficulty implements Serializer {
    readonly difficulty: bigint;
    constructor(difficulty: bigint);
    static deserialize(payload: Uint8Array): Difficulty;
    get size(): number;
    serialize(): Uint8Array;
}
