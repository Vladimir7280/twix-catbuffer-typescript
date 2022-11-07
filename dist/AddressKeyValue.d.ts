import { MosaicRestrictionKey } from './MosaicRestrictionKey';
import { Serializer } from './Serializer';
export interface AddressKeyValueParams {
    key: MosaicRestrictionKey;
    value: bigint;
}
export declare class AddressKeyValue implements Serializer {
    readonly key: MosaicRestrictionKey;
    readonly value: bigint;
    constructor({ key, value }: AddressKeyValueParams);
    static deserialize(payload: Uint8Array): AddressKeyValue;
    get size(): number;
    serialize(): Uint8Array;
}
