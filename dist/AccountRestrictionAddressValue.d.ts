import { Address } from './Address';
import { Serializer } from './Serializer';
export interface AccountRestrictionAddressValueParams {
    restrictionValues: Address[];
}
export declare class AccountRestrictionAddressValue implements Serializer {
    readonly restrictionValues: Address[];
    constructor({ restrictionValues }: AccountRestrictionAddressValueParams);
    static deserialize(payload: Uint8Array): AccountRestrictionAddressValue;
    get size(): number;
    serialize(): Uint8Array;
}
