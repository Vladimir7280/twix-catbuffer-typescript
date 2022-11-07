import { AccountRestrictionFlags } from './AccountRestrictionFlags';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
import { UnresolvedAddress } from './UnresolvedAddress';
export interface EmbeddedAccountAddressRestrictionTransactionV1Params {
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    restrictionFlags: AccountRestrictionFlags[];
    restrictionAdditions: UnresolvedAddress[];
    restrictionDeletions: UnresolvedAddress[];
}
export declare class EmbeddedAccountAddressRestrictionTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16720;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly restrictionFlags: AccountRestrictionFlags[];
    readonly restrictionAdditions: UnresolvedAddress[];
    readonly restrictionDeletions: UnresolvedAddress[];
    constructor({ signerPublicKey, version, network, type, restrictionFlags, restrictionAdditions, restrictionDeletions, }: EmbeddedAccountAddressRestrictionTransactionV1Params);
    static deserialize(payload: Uint8Array): EmbeddedAccountAddressRestrictionTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
