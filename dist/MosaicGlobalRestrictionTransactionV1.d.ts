import { Amount } from './Amount';
import { MosaicRestrictionType } from './MosaicRestrictionType';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { Signature } from './Signature';
import { Timestamp } from './Timestamp';
import { TransactionType } from './TransactionType';
import { UnresolvedMosaicId } from './UnresolvedMosaicId';
export interface MosaicGlobalRestrictionTransactionV1Params {
    signature: Signature;
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    fee: Amount;
    deadline: Timestamp;
    mosaicId: UnresolvedMosaicId;
    referenceMosaicId: UnresolvedMosaicId;
    restrictionKey: bigint;
    previousRestrictionValue: bigint;
    newRestrictionValue: bigint;
    previousRestrictionType: MosaicRestrictionType;
    newRestrictionType: MosaicRestrictionType;
}
export declare class MosaicGlobalRestrictionTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16721;
    readonly signature: Signature;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly fee: Amount;
    readonly deadline: Timestamp;
    readonly mosaicId: UnresolvedMosaicId;
    readonly referenceMosaicId: UnresolvedMosaicId;
    readonly restrictionKey: bigint;
    readonly previousRestrictionValue: bigint;
    readonly newRestrictionValue: bigint;
    readonly previousRestrictionType: MosaicRestrictionType;
    readonly newRestrictionType: MosaicRestrictionType;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType, }: MosaicGlobalRestrictionTransactionV1Params);
    static deserialize(payload: Uint8Array): MosaicGlobalRestrictionTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
