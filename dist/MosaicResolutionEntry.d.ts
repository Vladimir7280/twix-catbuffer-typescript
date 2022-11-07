import { MosaicId } from './MosaicId';
import { ReceiptSource } from './ReceiptSource';
import { Serializer } from './Serializer';
export interface MosaicResolutionEntryParams {
    source: ReceiptSource;
    resolvedValue: MosaicId;
}
export declare class MosaicResolutionEntry implements Serializer {
    readonly source: ReceiptSource;
    readonly resolvedValue: MosaicId;
    constructor({ source, resolvedValue }: MosaicResolutionEntryParams);
    static deserialize(payload: Uint8Array): MosaicResolutionEntry;
    get size(): number;
    serialize(): Uint8Array;
}
