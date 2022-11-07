import { Serializer } from './Serializer';
export declare class BlockCollectedEpochFees implements Serializer {
    readonly blockCollectedEpochFees: bigint;
    constructor(blockCollectedEpochFees: bigint);
    static deserialize(payload: Uint8Array): BlockCollectedEpochFees;
    get size(): number;
    serialize(): Uint8Array;
}
