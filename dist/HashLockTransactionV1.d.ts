import { Amount } from './Amount';
import { BlockDuration } from './BlockDuration';
import { Hash256 } from './Hash256';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { Signature } from './Signature';
import { Timestamp } from './Timestamp';
import { TransactionType } from './TransactionType';
import { UnresolvedMosaic } from './UnresolvedMosaic';
export interface HashLockTransactionV1Params {
    signature: Signature;
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    fee: Amount;
    deadline: Timestamp;
    mosaic: UnresolvedMosaic;
    duration: BlockDuration;
    hash: Hash256;
}
export declare class HashLockTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16712;
    readonly signature: Signature;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly fee: Amount;
    readonly deadline: Timestamp;
    readonly mosaic: UnresolvedMosaic;
    readonly duration: BlockDuration;
    readonly hash: Hash256;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, mosaic, duration, hash, }: HashLockTransactionV1Params);
    static deserialize(payload: Uint8Array): HashLockTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
