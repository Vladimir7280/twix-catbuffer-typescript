import { Serializer } from './Serializer';
export declare class UnresolvedMosaicId implements Serializer {
    readonly unresolvedMosaicId: bigint;
    constructor(unresolvedMosaicId: bigint);
    static deserialize(payload: Uint8Array): UnresolvedMosaicId;
    get size(): number;
    serialize(): Uint8Array;
}
