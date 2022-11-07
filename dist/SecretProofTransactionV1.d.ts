import { Amount } from './Amount';
import { Hash256 } from './Hash256';
import { LockHashAlgorithm } from './LockHashAlgorithm';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { Signature } from './Signature';
import { Timestamp } from './Timestamp';
import { TransactionType } from './TransactionType';
import { UnresolvedAddress } from './UnresolvedAddress';
export interface SecretProofTransactionV1Params {
    signature: Signature;
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    fee: Amount;
    deadline: Timestamp;
    recipientAddress: UnresolvedAddress;
    secret: Hash256;
    hashAlgorithm: LockHashAlgorithm;
    proof: Uint8Array;
}
export declare class SecretProofTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16978;
    readonly signature: Signature;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly fee: Amount;
    readonly deadline: Timestamp;
    readonly recipientAddress: UnresolvedAddress;
    readonly secret: Hash256;
    readonly hashAlgorithm: LockHashAlgorithm;
    readonly proof: Uint8Array;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, recipientAddress, secret, hashAlgorithm, proof, }: SecretProofTransactionV1Params);
    static deserialize(payload: Uint8Array): SecretProofTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
