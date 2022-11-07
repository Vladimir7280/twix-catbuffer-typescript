import { Serializer } from './Serializer';
export declare class MosaicNonce implements Serializer {
    readonly mosaicNonce: number;
    constructor(mosaicNonce: number);
    static deserialize(payload: Uint8Array): MosaicNonce;
    get size(): number;
    serialize(): Uint8Array;
}
