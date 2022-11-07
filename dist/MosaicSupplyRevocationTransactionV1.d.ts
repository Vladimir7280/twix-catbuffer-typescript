import { Amount } from './Amount';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { Signature } from './Signature';
import { Timestamp } from './Timestamp';
import { TransactionType } from './TransactionType';
import { UnresolvedAddress } from './UnresolvedAddress';
import { UnresolvedMosaic } from './UnresolvedMosaic';
export interface MosaicSupplyRevocationTransactionV1Params {
    signature: Signature;
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    fee: Amount;
    deadline: Timestamp;
    sourceAddress: UnresolvedAddress;
    mosaic: UnresolvedMosaic;
}
export declare class MosaicSupplyRevocationTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 17229;
    readonly signature: Signature;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly fee: Amount;
    readonly deadline: Timestamp;
    readonly sourceAddress: UnresolvedAddress;
    readonly mosaic: UnresolvedMosaic;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, sourceAddress, mosaic, }: MosaicSupplyRevocationTransactionV1Params);
    static deserialize(payload: Uint8Array): MosaicSupplyRevocationTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
