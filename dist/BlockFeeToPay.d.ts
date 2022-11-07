import { Serializer } from './Serializer';
export declare class BlockFeeToPay implements Serializer {
    readonly blockFeeToPay: bigint;
    constructor(blockFeeToPay: bigint);
    static deserialize(payload: Uint8Array): BlockFeeToPay;
    get size(): number;
    serialize(): Uint8Array;
}
