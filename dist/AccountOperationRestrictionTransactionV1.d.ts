import { AccountRestrictionFlags } from './AccountRestrictionFlags';
import { Amount } from './Amount';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { Signature } from './Signature';
import { Timestamp } from './Timestamp';
import { TransactionType } from './TransactionType';
export interface AccountOperationRestrictionTransactionV1Params {
    signature: Signature;
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    fee: Amount;
    deadline: Timestamp;
    restrictionFlags: AccountRestrictionFlags[];
    restrictionAdditions: TransactionType[];
    restrictionDeletions: TransactionType[];
}
export declare class AccountOperationRestrictionTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 17232;
    readonly signature: Signature;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly fee: Amount;
    readonly deadline: Timestamp;
    readonly restrictionFlags: AccountRestrictionFlags[];
    readonly restrictionAdditions: TransactionType[];
    readonly restrictionDeletions: TransactionType[];
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions, }: AccountOperationRestrictionTransactionV1Params);
    static deserialize(payload: Uint8Array): AccountOperationRestrictionTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
