import { Serializer } from './Serializer';
export declare class ProofGamma implements Serializer {
    readonly proofGamma: Uint8Array;
    constructor(proofGamma: Uint8Array);
    static deserialize(payload: Uint8Array): ProofGamma;
    get size(): number;
    serialize(): Uint8Array;
}
