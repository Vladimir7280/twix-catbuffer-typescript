import { Address } from './Address';
import { AddressKeyValueSet } from './AddressKeyValueSet';
import { MosaicId } from './MosaicId';
import { Serializer } from './Serializer';
export interface MosaicAddressRestrictionEntryParams {
    mosaicId: MosaicId;
    address: Address;
    keyPairs: AddressKeyValueSet;
}
export declare class MosaicAddressRestrictionEntry implements Serializer {
    readonly mosaicId: MosaicId;
    readonly address: Address;
    readonly keyPairs: AddressKeyValueSet;
    constructor({ mosaicId, address, keyPairs }: MosaicAddressRestrictionEntryParams);
    static deserialize(payload: Uint8Array): MosaicAddressRestrictionEntry;
    get size(): number;
    serialize(): Uint8Array;
}
