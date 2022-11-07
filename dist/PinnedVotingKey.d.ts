import { FinalizationEpoch } from './FinalizationEpoch';
import { Serializer } from './Serializer';
import { VotingPublicKey } from './VotingPublicKey';
export interface PinnedVotingKeyParams {
    votingKey: VotingPublicKey;
    startEpoch: FinalizationEpoch;
    endEpoch: FinalizationEpoch;
}
export declare class PinnedVotingKey implements Serializer {
    readonly votingKey: VotingPublicKey;
    readonly startEpoch: FinalizationEpoch;
    readonly endEpoch: FinalizationEpoch;
    constructor({ votingKey, startEpoch, endEpoch }: PinnedVotingKeyParams);
    static deserialize(payload: Uint8Array): PinnedVotingKey;
    get size(): number;
    serialize(): Uint8Array;
}
