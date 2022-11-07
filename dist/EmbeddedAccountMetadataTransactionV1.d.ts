import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
import { UnresolvedAddress } from './UnresolvedAddress';
export interface EmbeddedAccountMetadataTransactionV1Params {
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    targetAddress: UnresolvedAddress;
    scopedMetadataKey: bigint;
    valueSizeDelta: number;
    value: Uint8Array;
}
export declare class EmbeddedAccountMetadataTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16708;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly targetAddress: UnresolvedAddress;
    readonly scopedMetadataKey: bigint;
    readonly valueSizeDelta: number;
    readonly value: Uint8Array;
    constructor({ signerPublicKey, version, network, type, targetAddress, scopedMetadataKey, valueSizeDelta, value, }: EmbeddedAccountMetadataTransactionV1Params);
    static deserialize(payload: Uint8Array): EmbeddedAccountMetadataTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
