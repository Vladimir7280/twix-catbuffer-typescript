import { Serializer } from './Serializer';
export declare class MosaicId implements Serializer {
    readonly mosaicId: bigint;
    constructor(mosaicId: bigint);
    static deserialize(payload: Uint8Array): MosaicId;
    get size(): number;
    serialize(): Uint8Array;
}
