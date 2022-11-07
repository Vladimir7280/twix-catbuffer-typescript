import { Amount } from './Amount';
import { BlockDuration } from './BlockDuration';
import { NamespaceId } from './NamespaceId';
import { NamespaceRegistrationType } from './NamespaceRegistrationType';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { Signature } from './Signature';
import { Timestamp } from './Timestamp';
import { TransactionType } from './TransactionType';
export interface NamespaceRegistrationTransactionV1Params {
    signature: Signature;
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    fee: Amount;
    deadline: Timestamp;
    duration?: BlockDuration;
    parentId?: NamespaceId;
    id: NamespaceId;
    registrationType: NamespaceRegistrationType;
    name: Uint8Array;
}
export declare class NamespaceRegistrationTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16718;
    readonly signature: Signature;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly fee: Amount;
    readonly deadline: Timestamp;
    readonly duration?: BlockDuration;
    readonly parentId?: NamespaceId;
    readonly id: NamespaceId;
    readonly registrationType: NamespaceRegistrationType;
    readonly name: Uint8Array;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, duration, parentId, id, registrationType, name, }: NamespaceRegistrationTransactionV1Params);
    static deserialize(payload: Uint8Array): NamespaceRegistrationTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
