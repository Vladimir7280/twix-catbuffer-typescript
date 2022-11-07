import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
import { UnresolvedAddress } from './UnresolvedAddress';
import { UnresolvedMosaicId } from './UnresolvedMosaicId';
export interface EmbeddedMosaicMetadataTransactionV1Params {
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    targetAddress: UnresolvedAddress;
    scopedMetadataKey: bigint;
    targetMosaicId: UnresolvedMosaicId;
    valueSizeDelta: number;
    value: Uint8Array;
}
export declare class EmbeddedMosaicMetadataTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16964;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly targetAddress: UnresolvedAddress;
    readonly scopedMetadataKey: bigint;
    readonly targetMosaicId: UnresolvedMosaicId;
    readonly valueSizeDelta: number;
    readonly value: Uint8Array;
    constructor({ signerPublicKey, version, network, type, targetAddress, scopedMetadataKey, targetMosaicId, valueSizeDelta, value, }: EmbeddedMosaicMetadataTransactionV1Params);
    static deserialize(payload: Uint8Array): EmbeddedMosaicMetadataTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
