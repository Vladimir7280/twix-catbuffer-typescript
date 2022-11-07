import { Serializer } from './Serializer';
export declare class ProofScalar implements Serializer {
    readonly proofScalar: Uint8Array;
    constructor(proofScalar: Uint8Array);
    static deserialize(payload: Uint8Array): ProofScalar;
    get size(): number;
    serialize(): Uint8Array;
}
