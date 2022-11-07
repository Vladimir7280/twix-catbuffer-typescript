import { Amount } from './Amount';
import { NamespaceId } from './NamespaceId';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { Signature } from './Signature';
import { Timestamp } from './Timestamp';
import { TransactionType } from './TransactionType';
import { UnresolvedAddress } from './UnresolvedAddress';
export interface NamespaceMetadataTransactionV1Params {
    signature: Signature;
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    fee: Amount;
    deadline: Timestamp;
    targetAddress: UnresolvedAddress;
    scopedMetadataKey: bigint;
    targetNamespaceId: NamespaceId;
    valueSizeDelta: number;
    value: Uint8Array;
}
export declare class NamespaceMetadataTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 17220;
    readonly signature: Signature;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly fee: Amount;
    readonly deadline: Timestamp;
    readonly targetAddress: UnresolvedAddress;
    readonly scopedMetadataKey: bigint;
    readonly targetNamespaceId: NamespaceId;
    readonly valueSizeDelta: number;
    readonly value: Uint8Array;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, targetAddress, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value, }: NamespaceMetadataTransactionV1Params);
    static deserialize(payload: Uint8Array): NamespaceMetadataTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
