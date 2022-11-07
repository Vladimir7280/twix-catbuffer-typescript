import { Amount } from './Amount';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { Signature } from './Signature';
import { Timestamp } from './Timestamp';
import { TransactionType } from './TransactionType';
import { UnresolvedAddress } from './UnresolvedAddress';
import { UnresolvedMosaic } from './UnresolvedMosaic';
export interface TransferTransactionV1Params {
    signature: Signature;
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    fee: Amount;
    deadline: Timestamp;
    recipientAddress: UnresolvedAddress;
    mosaics: UnresolvedMosaic[];
    message: Uint8Array;
}
export declare class TransferTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16724;
    readonly signature: Signature;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly fee: Amount;
    readonly deadline: Timestamp;
    readonly recipientAddress: UnresolvedAddress;
    readonly mosaics: UnresolvedMosaic[];
    readonly message: Uint8Array;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, recipientAddress, mosaics, message, }: TransferTransactionV1Params);
    static deserialize(payload: Uint8Array): TransferTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
