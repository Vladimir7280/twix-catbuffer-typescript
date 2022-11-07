import { Amount } from './Amount';
import { FinalizationEpoch } from './FinalizationEpoch';
import { LinkAction } from './LinkAction';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { Signature } from './Signature';
import { Timestamp } from './Timestamp';
import { TransactionType } from './TransactionType';
import { VotingPublicKey } from './VotingPublicKey';
export interface VotingKeyLinkTransactionV1Params {
    signature: Signature;
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    fee: Amount;
    deadline: Timestamp;
    linkedPublicKey: VotingPublicKey;
    startEpoch: FinalizationEpoch;
    endEpoch: FinalizationEpoch;
    linkAction: LinkAction;
}
export declare class VotingKeyLinkTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16707;
    readonly signature: Signature;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly fee: Amount;
    readonly deadline: Timestamp;
    readonly linkedPublicKey: VotingPublicKey;
    readonly startEpoch: FinalizationEpoch;
    readonly endEpoch: FinalizationEpoch;
    readonly linkAction: LinkAction;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, startEpoch, endEpoch, linkAction, }: VotingKeyLinkTransactionV1Params);
    static deserialize(payload: Uint8Array): VotingKeyLinkTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
