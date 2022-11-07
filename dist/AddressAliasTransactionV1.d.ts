import { Address } from './Address';
import { AliasAction } from './AliasAction';
import { Amount } from './Amount';
import { NamespaceId } from './NamespaceId';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { Signature } from './Signature';
import { Timestamp } from './Timestamp';
import { TransactionType } from './TransactionType';
export interface AddressAliasTransactionV1Params {
    signature: Signature;
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    fee: Amount;
    deadline: Timestamp;
    namespaceId: NamespaceId;
    address: Address;
    aliasAction: AliasAction;
}
export declare class AddressAliasTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16974;
    readonly signature: Signature;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly fee: Amount;
    readonly deadline: Timestamp;
    readonly namespaceId: NamespaceId;
    readonly address: Address;
    readonly aliasAction: AliasAction;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, namespaceId, address, aliasAction, }: AddressAliasTransactionV1Params);
    static deserialize(payload: Uint8Array): AddressAliasTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
