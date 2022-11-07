import { AccountRestrictionFlags } from './AccountRestrictionFlags';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
export interface EmbeddedAccountOperationRestrictionTransactionV1Params {
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    restrictionFlags: AccountRestrictionFlags[];
    restrictionAdditions: TransactionType[];
    restrictionDeletions: TransactionType[];
}
export declare class EmbeddedAccountOperationRestrictionTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 17232;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly restrictionFlags: AccountRestrictionFlags[];
    readonly restrictionAdditions: TransactionType[];
    readonly restrictionDeletions: TransactionType[];
    constructor({ signerPublicKey, version, network, type, restrictionFlags, restrictionAdditions, restrictionDeletions, }: EmbeddedAccountOperationRestrictionTransactionV1Params);
    static deserialize(payload: Uint8Array): EmbeddedAccountOperationRestrictionTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
