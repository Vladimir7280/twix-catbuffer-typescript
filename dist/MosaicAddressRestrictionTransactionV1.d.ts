import { Amount } from './Amount';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { Signature } from './Signature';
import { Timestamp } from './Timestamp';
import { TransactionType } from './TransactionType';
import { UnresolvedAddress } from './UnresolvedAddress';
import { UnresolvedMosaicId } from './UnresolvedMosaicId';
export interface MosaicAddressRestrictionTransactionV1Params {
    signature: Signature;
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    fee: Amount;
    deadline: Timestamp;
    mosaicId: UnresolvedMosaicId;
    restrictionKey: bigint;
    previousRestrictionValue: bigint;
    newRestrictionValue: bigint;
    targetAddress: UnresolvedAddress;
}
export declare class MosaicAddressRestrictionTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16977;
    readonly signature: Signature;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly fee: Amount;
    readonly deadline: Timestamp;
    readonly mosaicId: UnresolvedMosaicId;
    readonly restrictionKey: bigint;
    readonly previousRestrictionValue: bigint;
    readonly newRestrictionValue: bigint;
    readonly targetAddress: UnresolvedAddress;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress, }: MosaicAddressRestrictionTransactionV1Params);
    static deserialize(payload: Uint8Array): MosaicAddressRestrictionTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
