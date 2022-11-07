import { BlockDuration } from './BlockDuration';
import { NamespaceId } from './NamespaceId';
import { NamespaceRegistrationType } from './NamespaceRegistrationType';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
export interface EmbeddedNamespaceRegistrationTransactionV1Params {
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    duration?: BlockDuration;
    parentId?: NamespaceId;
    id: NamespaceId;
    registrationType: NamespaceRegistrationType;
    name: Uint8Array;
}
export declare class EmbeddedNamespaceRegistrationTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16718;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly duration?: BlockDuration;
    readonly parentId?: NamespaceId;
    readonly id: NamespaceId;
    readonly registrationType: NamespaceRegistrationType;
    readonly name: Uint8Array;
    constructor({ signerPublicKey, version, network, type, duration, parentId, id, registrationType, name, }: EmbeddedNamespaceRegistrationTransactionV1Params);
    static deserialize(payload: Uint8Array): EmbeddedNamespaceRegistrationTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
