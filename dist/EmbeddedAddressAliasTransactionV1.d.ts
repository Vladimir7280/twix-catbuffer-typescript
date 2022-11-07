import { Address } from './Address';
import { AliasAction } from './AliasAction';
import { NamespaceId } from './NamespaceId';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
export interface EmbeddedAddressAliasTransactionV1Params {
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    namespaceId: NamespaceId;
    address: Address;
    aliasAction: AliasAction;
}
export declare class EmbeddedAddressAliasTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16974;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly namespaceId: NamespaceId;
    readonly address: Address;
    readonly aliasAction: AliasAction;
    constructor({ signerPublicKey, version, network, type, namespaceId, address, aliasAction }: EmbeddedAddressAliasTransactionV1Params);
    static deserialize(payload: Uint8Array): EmbeddedAddressAliasTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
