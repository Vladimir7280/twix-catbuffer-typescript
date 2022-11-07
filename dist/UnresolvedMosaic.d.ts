import { Amount } from './Amount';
import { Serializer } from './Serializer';
import { UnresolvedMosaicId } from './UnresolvedMosaicId';
export interface UnresolvedMosaicParams {
    mosaicId: UnresolvedMosaicId;
    amount: Amount;
}
export declare class UnresolvedMosaic implements Serializer {
    readonly mosaicId: UnresolvedMosaicId;
    readonly amount: Amount;
    constructor({ mosaicId, amount }: UnresolvedMosaicParams);
    static deserialize(payload: Uint8Array): UnresolvedMosaic;
    get size(): number;
    serialize(): Uint8Array;
}
