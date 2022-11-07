import { Serializer } from './Serializer';
export declare class ProofVerificationHash implements Serializer {
    readonly proofVerificationHash: Uint8Array;
    constructor(proofVerificationHash: Uint8Array);
    static deserialize(payload: Uint8Array): ProofVerificationHash;
    get size(): number;
    serialize(): Uint8Array;
}
