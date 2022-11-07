import { Serializer } from './Serializer';
export declare class Importance implements Serializer {
    readonly importance: bigint;
    constructor(importance: bigint);
    static deserialize(payload: Uint8Array): Importance;
    get size(): number;
    serialize(): Uint8Array;
}
