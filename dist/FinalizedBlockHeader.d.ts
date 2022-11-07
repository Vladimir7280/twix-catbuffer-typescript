import { FinalizationRound } from './FinalizationRound';
import { Hash256 } from './Hash256';
import { Height } from './Height';
import { Serializer } from './Serializer';
export interface FinalizedBlockHeaderParams {
    round: FinalizationRound;
    height: Height;
    hash: Hash256;
}
export declare class FinalizedBlockHeader implements Serializer {
    readonly round: FinalizationRound;
    readonly height: Height;
    readonly hash: Hash256;
    constructor({ round, height, hash }: FinalizedBlockHeaderParams);
    static deserialize(payload: Uint8Array): FinalizedBlockHeader;
    get size(): number;
    serialize(): Uint8Array;
}
