import { BlockDuration } from './BlockDuration';
import { Hash256 } from './Hash256';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
import { UnresolvedMosaic } from './UnresolvedMosaic';
export interface EmbeddedHashLockTransactionV1Params {
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    mosaic: UnresolvedMosaic;
    duration: BlockDuration;
    hash: Hash256;
}
export declare class EmbeddedHashLockTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16712;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly mosaic: UnresolvedMosaic;
    readonly duration: BlockDuration;
    readonly hash: Hash256;
    constructor({ signerPublicKey, version, network, type, mosaic, duration, hash }: EmbeddedHashLockTransactionV1Params);
    static deserialize(payload: Uint8Array): EmbeddedHashLockTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
