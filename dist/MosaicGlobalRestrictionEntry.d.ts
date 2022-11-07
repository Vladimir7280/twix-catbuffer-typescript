import { GlobalKeyValueSet } from './GlobalKeyValueSet';
import { MosaicId } from './MosaicId';
import { Serializer } from './Serializer';
export interface MosaicGlobalRestrictionEntryParams {
    mosaicId: MosaicId;
    keyPairs: GlobalKeyValueSet;
}
export declare class MosaicGlobalRestrictionEntry implements Serializer {
    readonly mosaicId: MosaicId;
    readonly keyPairs: GlobalKeyValueSet;
    constructor({ mosaicId, keyPairs }: MosaicGlobalRestrictionEntryParams);
    static deserialize(payload: Uint8Array): MosaicGlobalRestrictionEntry;
    get size(): number;
    serialize(): Uint8Array;
}
