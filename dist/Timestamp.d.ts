import { Serializer } from './Serializer';
export declare class Timestamp implements Serializer {
    readonly timestamp: bigint;
    constructor(timestamp: bigint);
    static deserialize(payload: Uint8Array): Timestamp;
    get size(): number;
    serialize(): Uint8Array;
}
