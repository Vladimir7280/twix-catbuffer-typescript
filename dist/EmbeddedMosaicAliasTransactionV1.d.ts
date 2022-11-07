import { AliasAction } from './AliasAction';
import { MosaicId } from './MosaicId';
import { NamespaceId } from './NamespaceId';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
export interface EmbeddedMosaicAliasTransactionV1Params {
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    namespaceId: NamespaceId;
    mosaicId: MosaicId;
    aliasAction: AliasAction;
}
export declare class EmbeddedMosaicAliasTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 17230;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly namespaceId: NamespaceId;
    readonly mosaicId: MosaicId;
    readonly aliasAction: AliasAction;
    constructor({ signerPublicKey, version, network, type, namespaceId, mosaicId, aliasAction }: EmbeddedMosaicAliasTransactionV1Params);
    static deserialize(payload: Uint8Array): EmbeddedMosaicAliasTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
