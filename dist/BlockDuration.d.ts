import { Serializer } from './Serializer';
export declare class BlockDuration implements Serializer {
    readonly blockDuration: bigint;
    constructor(blockDuration: bigint);
    static deserialize(payload: Uint8Array): BlockDuration;
    get size(): number;
    serialize(): Uint8Array;
}
