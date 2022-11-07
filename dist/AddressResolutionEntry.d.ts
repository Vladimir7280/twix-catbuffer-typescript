import { Address } from './Address';
import { ReceiptSource } from './ReceiptSource';
import { Serializer } from './Serializer';
export interface AddressResolutionEntryParams {
    source: ReceiptSource;
    resolvedValue: Address;
}
export declare class AddressResolutionEntry implements Serializer {
    readonly source: ReceiptSource;
    readonly resolvedValue: Address;
    constructor({ source, resolvedValue }: AddressResolutionEntryParams);
    static deserialize(payload: Uint8Array): AddressResolutionEntry;
    get size(): number;
    serialize(): Uint8Array;
}
