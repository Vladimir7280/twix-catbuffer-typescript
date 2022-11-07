import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
export interface AccountRestrictionTransactionTypeValueParams {
    restrictionValues: TransactionType[];
}
export declare class AccountRestrictionTransactionTypeValue implements Serializer {
    readonly restrictionValues: TransactionType[];
    constructor({ restrictionValues }: AccountRestrictionTransactionTypeValueParams);
    static deserialize(payload: Uint8Array): AccountRestrictionTransactionTypeValue;
    get size(): number;
    serialize(): Uint8Array;
}
