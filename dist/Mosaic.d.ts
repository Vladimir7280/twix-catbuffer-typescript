import { Amount } from './Amount';
import { MosaicId } from './MosaicId';
import { Serializer } from './Serializer';
export interface MosaicParams {
    mosaicId: MosaicId;
    amount: Amount;
}
export declare class Mosaic implements Serializer {
    readonly mosaicId: MosaicId;
    readonly amount: Amount;
    constructor({ mosaicId, amount }: MosaicParams);
    static deserialize(payload: Uint8Array): Mosaic;
    get size(): number;
    serialize(): Uint8Array;
}
