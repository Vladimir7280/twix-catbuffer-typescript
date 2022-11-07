import { Serializer } from './Serializer';
export declare class BlockInflation implements Serializer {
    readonly blockInflation: bigint;
    constructor(blockInflation: bigint);
    static deserialize(payload: Uint8Array): BlockInflation;
    get size(): number;
    serialize(): Uint8Array;
}
