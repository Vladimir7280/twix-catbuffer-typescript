import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { Signature } from './Signature';
export interface CosignatureParams {
    version: bigint;
    signerPublicKey: PublicKey;
    signature: Signature;
}
export declare class Cosignature implements Serializer {
    readonly version: bigint;
    readonly signerPublicKey: PublicKey;
    readonly signature: Signature;
    constructor({ version, signerPublicKey, signature }: CosignatureParams);
    static deserialize(payload: Uint8Array): Cosignature;
    get size(): number;
    serialize(): Uint8Array;
}
