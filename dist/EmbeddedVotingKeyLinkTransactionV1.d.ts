import { FinalizationEpoch } from './FinalizationEpoch';
import { LinkAction } from './LinkAction';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
import { VotingPublicKey } from './VotingPublicKey';
export interface EmbeddedVotingKeyLinkTransactionV1Params {
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    linkedPublicKey: VotingPublicKey;
    startEpoch: FinalizationEpoch;
    endEpoch: FinalizationEpoch;
    linkAction: LinkAction;
}
export declare class EmbeddedVotingKeyLinkTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16707;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly linkedPublicKey: VotingPublicKey;
    readonly startEpoch: FinalizationEpoch;
    readonly endEpoch: FinalizationEpoch;
    readonly linkAction: LinkAction;
    constructor({ signerPublicKey, version, network, type, linkedPublicKey, startEpoch, endEpoch, linkAction, }: EmbeddedVotingKeyLinkTransactionV1Params);
    static deserialize(payload: Uint8Array): EmbeddedVotingKeyLinkTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
