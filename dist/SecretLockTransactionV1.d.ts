import { Amount } from './Amount';
import { BlockDuration } from './BlockDuration';
import { Hash256 } from './Hash256';
import { LockHashAlgorithm } from './LockHashAlgorithm';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { Signature } from './Signature';
import { Timestamp } from './Timestamp';
import { TransactionType } from './TransactionType';
import { UnresolvedAddress } from './UnresolvedAddress';
import { UnresolvedMosaic } from './UnresolvedMosaic';
export interface SecretLockTransactionV1Params {
    signature: Signature;
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    fee: Amount;
    deadline: Timestamp;
    recipientAddress: UnresolvedAddress;
    secret: Hash256;
    mosaic: UnresolvedMosaic;
    duration: BlockDuration;
    hashAlgorithm: LockHashAlgorithm;
}
export declare class SecretLockTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16722;
    readonly signature: Signature;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly fee: Amount;
    readonly deadline: Timestamp;
    readonly recipientAddress: UnresolvedAddress;
    readonly secret: Hash256;
    readonly mosaic: UnresolvedMosaic;
    readonly duration: BlockDuration;
    readonly hashAlgorithm: LockHashAlgorithm;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, recipientAddress, secret, mosaic, duration, hashAlgorithm, }: SecretLockTransactionV1Params);
    static deserialize(payload: Uint8Array): SecretLockTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}