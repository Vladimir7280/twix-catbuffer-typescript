import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
import { UnresolvedAddress } from './UnresolvedAddress';
import { UnresolvedMosaicId } from './UnresolvedMosaicId';
export interface EmbeddedMosaicAddressRestrictionTransactionV1Params {
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    mosaicId: UnresolvedMosaicId;
    restrictionKey: bigint;
    previousRestrictionValue: bigint;
    newRestrictionValue: bigint;
    targetAddress: UnresolvedAddress;
}
export declare class EmbeddedMosaicAddressRestrictionTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16977;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly mosaicId: UnresolvedMosaicId;
    readonly restrictionKey: bigint;
    readonly previousRestrictionValue: bigint;
    readonly newRestrictionValue: bigint;
    readonly targetAddress: UnresolvedAddress;
    constructor({ signerPublicKey, version, network, type, mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress, }: EmbeddedMosaicAddressRestrictionTransactionV1Params);
    static deserialize(payload: Uint8Array): EmbeddedMosaicAddressRestrictionTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
