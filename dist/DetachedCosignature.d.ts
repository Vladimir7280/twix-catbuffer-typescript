import { Hash256 } from './Hash256';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { Signature } from './Signature';
export interface DetachedCosignatureParams {
    version: bigint;
    signerPublicKey: PublicKey;
    signature: Signature;
    parentHash: Hash256;
}
export declare class DetachedCosignature implements Serializer {
    readonly version: bigint;
    readonly signerPublicKey: PublicKey;
    readonly signature: Signature;
    readonly parentHash: Hash256;
    constructor({ version, signerPublicKey, signature, parentHash }: DetachedCosignatureParams);
    static deserialize(payload: Uint8Array): DetachedCosignature;
    get size(): number;
    serialize(): Uint8Array;
}
