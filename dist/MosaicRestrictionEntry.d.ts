import { MosaicAddressRestrictionEntry } from './MosaicAddressRestrictionEntry';
import { MosaicGlobalRestrictionEntry } from './MosaicGlobalRestrictionEntry';
import { MosaicRestrictionEntryType } from './MosaicRestrictionEntryType';
import { Serializer } from './Serializer';
export interface MosaicRestrictionEntryParams {
    version: number;
    entryType: MosaicRestrictionEntryType;
    addressEntry?: MosaicAddressRestrictionEntry;
    globalEntry?: MosaicGlobalRestrictionEntry;
}
export declare class MosaicRestrictionEntry implements Serializer {
    readonly version: number;
    readonly entryType: MosaicRestrictionEntryType;
    readonly addressEntry?: MosaicAddressRestrictionEntry;
    readonly globalEntry?: MosaicGlobalRestrictionEntry;
    constructor({ version, entryType, addressEntry, globalEntry }: MosaicRestrictionEntryParams);
    static deserialize(payload: Uint8Array): MosaicRestrictionEntry;
    get size(): number;
    serialize(): Uint8Array;
}
