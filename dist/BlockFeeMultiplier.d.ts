import { Serializer } from './Serializer';
export declare class BlockFeeMultiplier implements Serializer {
    readonly blockFeeMultiplier: number;
    constructor(blockFeeMultiplier: number);
    static deserialize(payload: Uint8Array): BlockFeeMultiplier;
    get size(): number;
    serialize(): Uint8Array;
}
