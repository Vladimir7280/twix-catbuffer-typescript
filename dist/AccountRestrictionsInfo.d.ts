import { AccountRestrictionAddressValue } from './AccountRestrictionAddressValue';
import { AccountRestrictionFlags } from './AccountRestrictionFlags';
import { AccountRestrictionMosaicValue } from './AccountRestrictionMosaicValue';
import { AccountRestrictionTransactionTypeValue } from './AccountRestrictionTransactionTypeValue';
import { Serializer } from './Serializer';
export interface AccountRestrictionsInfoParams {
    restrictionFlags: AccountRestrictionFlags[];
    addressRestrictions?: AccountRestrictionAddressValue;
    mosaicIdRestrictions?: AccountRestrictionMosaicValue;
    transactionTypeRestrictions?: AccountRestrictionTransactionTypeValue;
}
export declare class AccountRestrictionsInfo implements Serializer {
    readonly restrictionFlags: AccountRestrictionFlags[];
    readonly addressRestrictions?: AccountRestrictionAddressValue;
    readonly mosaicIdRestrictions?: AccountRestrictionMosaicValue;
    readonly transactionTypeRestrictions?: AccountRestrictionTransactionTypeValue;
    constructor({ restrictionFlags, addressRestrictions, mosaicIdRestrictions, transactionTypeRestrictions, }: AccountRestrictionsInfoParams);
    static deserialize(payload: Uint8Array): AccountRestrictionsInfo;
    get size(): number;
    serialize(): Uint8Array;
}
