import { BlockDuration } from './BlockDuration';
import { Hash256 } from './Hash256';
import { LockHashAlgorithm } from './LockHashAlgorithm';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
import { UnresolvedAddress } from './UnresolvedAddress';
import { UnresolvedMosaic } from './UnresolvedMosaic';
export interface EmbeddedSecretLockTransactionV1Params {
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    recipientAddress: UnresolvedAddress;
    secret: Hash256;
    mosaic: UnresolvedMosaic;
    duration: BlockDuration;
    hashAlgorithm: LockHashAlgorithm;
}
export declare class EmbeddedSecretLockTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16722;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly recipientAddress: UnresolvedAddress;
    readonly secret: Hash256;
    readonly mosaic: UnresolvedMosaic;
    readonly duration: BlockDuration;
    readonly hashAlgorithm: LockHashAlgorithm;
    constructor({ signerPublicKey, version, network, type, recipientAddress, secret, mosaic, duration, hashAlgorithm, }: EmbeddedSecretLockTransactionV1Params);
    static deserialize(payload: Uint8Array): EmbeddedSecretLockTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
