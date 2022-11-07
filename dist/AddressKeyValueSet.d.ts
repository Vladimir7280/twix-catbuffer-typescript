import { AddressKeyValue } from './AddressKeyValue';
import { Serializer } from './Serializer';
export interface AddressKeyValueSetParams {
    keys: AddressKeyValue[];
}
export declare class AddressKeyValueSet implements Serializer {
    readonly keys: AddressKeyValue[];
    constructor({ keys }: AddressKeyValueSetParams);
    static deserialize(payload: Uint8Array): AddressKeyValueSet;
    get size(): number;
    serialize(): Uint8Array;
}
