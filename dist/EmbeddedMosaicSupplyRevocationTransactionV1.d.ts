import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
import { UnresolvedAddress } from './UnresolvedAddress';
import { UnresolvedMosaic } from './UnresolvedMosaic';
export interface EmbeddedMosaicSupplyRevocationTransactionV1Params {
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    sourceAddress: UnresolvedAddress;
    mosaic: UnresolvedMosaic;
}
export declare class EmbeddedMosaicSupplyRevocationTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 17229;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly sourceAddress: UnresolvedAddress;
    readonly mosaic: UnresolvedMosaic;
    constructor({ signerPublicKey, version, network, type, sourceAddress, mosaic }: EmbeddedMosaicSupplyRevocationTransactionV1Params);
    static deserialize(payload: Uint8Array): EmbeddedMosaicSupplyRevocationTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
