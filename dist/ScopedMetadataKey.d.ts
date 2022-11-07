import { Serializer } from './Serializer';
export declare class ScopedMetadataKey implements Serializer {
    readonly scopedMetadataKey: bigint;
    constructor(scopedMetadataKey: bigint);
    static deserialize(payload: Uint8Array): ScopedMetadataKey;
    get size(): number;
    serialize(): Uint8Array;
}
