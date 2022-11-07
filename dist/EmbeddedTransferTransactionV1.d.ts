import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
import { UnresolvedAddress } from './UnresolvedAddress';
import { UnresolvedMosaic } from './UnresolvedMosaic';
export interface EmbeddedTransferTransactionV1Params {
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    recipientAddress: UnresolvedAddress;
    mosaics: UnresolvedMosaic[];
    message: Uint8Array;
}
export declare class EmbeddedTransferTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16724;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly recipientAddress: UnresolvedAddress;
    readonly mosaics: UnresolvedMosaic[];
    readonly message: Uint8Array;
    constructor({ signerPublicKey, version, network, type, recipientAddress, mosaics, message }: EmbeddedTransferTransactionV1Params);
    static deserialize(payload: Uint8Array): EmbeddedTransferTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
