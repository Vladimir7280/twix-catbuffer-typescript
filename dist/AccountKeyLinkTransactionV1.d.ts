import { Amount } from './Amount';
import { LinkAction } from './LinkAction';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { Signature } from './Signature';
import { Timestamp } from './Timestamp';
import { TransactionType } from './TransactionType';
export interface AccountKeyLinkTransactionV1Params {
    signature: Signature;
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    fee: Amount;
    deadline: Timestamp;
    linkedPublicKey: PublicKey;
    linkAction: LinkAction;
}
export declare class AccountKeyLinkTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16716;
    readonly signature: Signature;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly fee: Amount;
    readonly deadline: Timestamp;
    readonly linkedPublicKey: PublicKey;
    readonly linkAction: LinkAction;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, linkAction, }: AccountKeyLinkTransactionV1Params);
    static deserialize(payload: Uint8Array): AccountKeyLinkTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
