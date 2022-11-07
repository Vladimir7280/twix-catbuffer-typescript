import { Amount } from './Amount';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { Signature } from './Signature';
import { Timestamp } from './Timestamp';
import { TransactionType } from './TransactionType';
import { UnresolvedAddress } from './UnresolvedAddress';
import { UnresolvedMosaicId } from './UnresolvedMosaicId';
export interface MosaicMetadataTransactionV1Params {
    signature: Signature;
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    fee: Amount;
    deadline: Timestamp;
    targetAddress: UnresolvedAddress;
    scopedMetadataKey: bigint;
    targetMosaicId: UnresolvedMosaicId;
    valueSizeDelta: number;
    value: Uint8Array;
}
export declare class MosaicMetadataTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16964;
    readonly signature: Signature;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly fee: Amount;
    readonly deadline: Timestamp;
    readonly targetAddress: UnresolvedAddress;
    readonly scopedMetadataKey: bigint;
    readonly targetMosaicId: UnresolvedMosaicId;
    readonly valueSizeDelta: number;
    readonly value: Uint8Array;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, targetAddress, scopedMetadataKey, targetMosaicId, valueSizeDelta, value, }: MosaicMetadataTransactionV1Params);
    static deserialize(payload: Uint8Array): MosaicMetadataTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
