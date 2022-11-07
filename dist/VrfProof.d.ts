import { ProofGamma } from './ProofGamma';
import { ProofScalar } from './ProofScalar';
import { ProofVerificationHash } from './ProofVerificationHash';
import { Serializer } from './Serializer';
export interface VrfProofParams {
    gamma: ProofGamma;
    verificationHash: ProofVerificationHash;
    scalar: ProofScalar;
}
export declare class VrfProof implements Serializer {
    readonly gamma: ProofGamma;
    readonly verificationHash: ProofVerificationHash;
    readonly scalar: ProofScalar;
    constructor({ gamma, verificationHash, scalar }: VrfProofParams);
    static deserialize(payload: Uint8Array): VrfProof;
    get size(): number;
    serialize(): Uint8Array;
}
