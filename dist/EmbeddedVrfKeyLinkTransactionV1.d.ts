import { LinkAction } from './LinkAction';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
export interface EmbeddedVrfKeyLinkTransactionV1Params {
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    linkedPublicKey: PublicKey;
    linkAction: LinkAction;
}
export declare class EmbeddedVrfKeyLinkTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16963;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly linkedPublicKey: PublicKey;
    readonly linkAction: LinkAction;
    constructor({ signerPublicKey, version, network, type, linkedPublicKey, linkAction }: EmbeddedVrfKeyLinkTransactionV1Params);
    static deserialize(payload: Uint8Array): EmbeddedVrfKeyLinkTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
