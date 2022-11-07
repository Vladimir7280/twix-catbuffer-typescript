import { Serializer } from './Serializer';
export declare class VotingPublicKey implements Serializer {
    readonly votingPublicKey: Uint8Array;
    constructor(votingPublicKey: Uint8Array);
    static deserialize(payload: Uint8Array): VotingPublicKey;
    get size(): number;
    serialize(): Uint8Array;
}
