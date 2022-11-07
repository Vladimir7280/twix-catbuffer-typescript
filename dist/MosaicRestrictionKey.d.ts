import { Serializer } from './Serializer';
export declare class MosaicRestrictionKey implements Serializer {
    readonly mosaicRestrictionKey: bigint;
    constructor(mosaicRestrictionKey: bigint);
    static deserialize(payload: Uint8Array): MosaicRestrictionKey;
    get size(): number;
    serialize(): Uint8Array;
}
