import { Serializer } from './Serializer';
export declare class BlockTotalSupply implements Serializer {
    readonly blockTotalSupply: bigint;
    constructor(blockTotalSupply: bigint);
    static deserialize(payload: Uint8Array): BlockTotalSupply;
    get size(): number;
    serialize(): Uint8Array;
}
