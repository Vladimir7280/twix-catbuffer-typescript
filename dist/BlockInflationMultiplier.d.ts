import { Serializer } from './Serializer';
export declare class BlockInflationMultiplier implements Serializer {
    readonly blockInflationMultiplier: bigint;
    constructor(blockInflationMultiplier: bigint);
    static deserialize(payload: Uint8Array): BlockInflationMultiplier;
    get size(): number;
    serialize(): Uint8Array;
}
