import { AccountRestrictionFlags } from './AccountRestrictionFlags';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
import { UnresolvedMosaicId } from './UnresolvedMosaicId';
export interface EmbeddedAccountMosaicRestrictionTransactionV1Params {
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    restrictionFlags: AccountRestrictionFlags[];
    restrictionAdditions: UnresolvedMosaicId[];
    restrictionDeletions: UnresolvedMosaicId[];
}
export declare class EmbeddedAccountMosaicRestrictionTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16976;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly restrictionFlags: AccountRestrictionFlags[];
    readonly restrictionAdditions: UnresolvedMosaicId[];
    readonly restrictionDeletions: UnresolvedMosaicId[];
    constructor({ signerPublicKey, version, network, type, restrictionFlags, restrictionAdditions, restrictionDeletions, }: EmbeddedAccountMosaicRestrictionTransactionV1Params);
    static deserialize(payload: Uint8Array): EmbeddedAccountMosaicRestrictionTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
