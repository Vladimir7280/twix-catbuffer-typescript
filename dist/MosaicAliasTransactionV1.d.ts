import { AliasAction } from './AliasAction';
import { Amount } from './Amount';
import { MosaicId } from './MosaicId';
import { NamespaceId } from './NamespaceId';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { Signature } from './Signature';
import { Timestamp } from './Timestamp';
import { TransactionType } from './TransactionType';
export interface MosaicAliasTransactionV1Params {
    signature: Signature;
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    fee: Amount;
    deadline: Timestamp;
    namespaceId: NamespaceId;
    mosaicId: MosaicId;
    aliasAction: AliasAction;
}
export declare class MosaicAliasTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 17230;
    readonly signature: Signature;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly fee: Amount;
    readonly deadline: Timestamp;
    readonly namespaceId: NamespaceId;
    readonly mosaicId: MosaicId;
    readonly aliasAction: AliasAction;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, namespaceId, mosaicId, aliasAction, }: MosaicAliasTransactionV1Params);
    static deserialize(payload: Uint8Array): MosaicAliasTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
