import { AccountRestrictionFlags } from './AccountRestrictionFlags';
import { Amount } from './Amount';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { Signature } from './Signature';
import { Timestamp } from './Timestamp';
import { TransactionType } from './TransactionType';
import { UnresolvedMosaicId } from './UnresolvedMosaicId';
export interface AccountMosaicRestrictionTransactionV1Params {
    signature: Signature;
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    fee: Amount;
    deadline: Timestamp;
    restrictionFlags: AccountRestrictionFlags[];
    restrictionAdditions: UnresolvedMosaicId[];
    restrictionDeletions: UnresolvedMosaicId[];
}
export declare class AccountMosaicRestrictionTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16976;
    readonly signature: Signature;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly fee: Amount;
    readonly deadline: Timestamp;
    readonly restrictionFlags: AccountRestrictionFlags[];
    readonly restrictionAdditions: UnresolvedMosaicId[];
    readonly restrictionDeletions: UnresolvedMosaicId[];
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions, }: AccountMosaicRestrictionTransactionV1Params);
    static deserialize(payload: Uint8Array): AccountMosaicRestrictionTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
