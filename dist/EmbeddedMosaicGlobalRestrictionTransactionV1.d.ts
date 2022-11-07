import { MosaicRestrictionType } from './MosaicRestrictionType';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
import { UnresolvedMosaicId } from './UnresolvedMosaicId';
export interface EmbeddedMosaicGlobalRestrictionTransactionV1Params {
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    mosaicId: UnresolvedMosaicId;
    referenceMosaicId: UnresolvedMosaicId;
    restrictionKey: bigint;
    previousRestrictionValue: bigint;
    newRestrictionValue: bigint;
    previousRestrictionType: MosaicRestrictionType;
    newRestrictionType: MosaicRestrictionType;
}
export declare class EmbeddedMosaicGlobalRestrictionTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16721;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly mosaicId: UnresolvedMosaicId;
    readonly referenceMosaicId: UnresolvedMosaicId;
    readonly restrictionKey: bigint;
    readonly previousRestrictionValue: bigint;
    readonly newRestrictionValue: bigint;
    readonly previousRestrictionType: MosaicRestrictionType;
    readonly newRestrictionType: MosaicRestrictionType;
    constructor({ signerPublicKey, version, network, type, mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType, }: EmbeddedMosaicGlobalRestrictionTransactionV1Params);
    static deserialize(payload: Uint8Array): EmbeddedMosaicGlobalRestrictionTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
