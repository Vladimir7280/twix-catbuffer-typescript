import { Serializer } from './Serializer';
export declare class UnresolvedAddress implements Serializer {
    readonly unresolvedAddress: Uint8Array;
    constructor(unresolvedAddress: Uint8Array);
    static deserialize(payload: Uint8Array): UnresolvedAddress;
    get size(): number;
    serialize(): Uint8Array;
}
