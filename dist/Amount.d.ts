import { Serializer } from './Serializer';
export declare class Amount implements Serializer {
    readonly amount: bigint;
    constructor(amount: bigint);
    static deserialize(payload: Uint8Array): Amount;
    get size(): number;
    serialize(): Uint8Array;
}
