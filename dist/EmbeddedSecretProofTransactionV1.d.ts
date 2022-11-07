import { Hash256 } from './Hash256';
import { LockHashAlgorithm } from './LockHashAlgorithm';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
import { UnresolvedAddress } from './UnresolvedAddress';
export interface EmbeddedSecretProofTransactionV1Params {
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    recipientAddress: UnresolvedAddress;
    secret: Hash256;
    hashAlgorithm: LockHashAlgorithm;
    proof: Uint8Array;
}
export declare class EmbeddedSecretProofTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16978;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly recipientAddress: UnresolvedAddress;
    readonly secret: Hash256;
    readonly hashAlgorithm: LockHashAlgorithm;
    readonly proof: Uint8Array;
    constructor({ signerPublicKey, version, network, type, recipientAddress, secret, hashAlgorithm, proof, }: EmbeddedSecretProofTransactionV1Params);
    static deserialize(payload: Uint8Array): EmbeddedSecretProofTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
