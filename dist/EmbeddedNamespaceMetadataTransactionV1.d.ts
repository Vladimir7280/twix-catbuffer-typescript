import { NamespaceId } from './NamespaceId';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
import { UnresolvedAddress } from './UnresolvedAddress';
export interface EmbeddedNamespaceMetadataTransactionV1Params {
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    targetAddress: UnresolvedAddress;
    scopedMetadataKey: bigint;
    targetNamespaceId: NamespaceId;
    valueSizeDelta: number;
    value: Uint8Array;
}
export declare class EmbeddedNamespaceMetadataTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 17220;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly targetAddress: UnresolvedAddress;
    readonly scopedMetadataKey: bigint;
    readonly targetNamespaceId: NamespaceId;
    readonly valueSizeDelta: number;
    readonly value: Uint8Array;
    constructor({ signerPublicKey, version, network, type, targetAddress, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value, }: EmbeddedNamespaceMetadataTransactionV1Params);
    static deserialize(payload: Uint8Array): EmbeddedNamespaceMetadataTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
