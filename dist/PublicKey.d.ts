import { Serializer } from './Serializer';
export declare class PublicKey implements Serializer {
    readonly publicKey: Uint8Array;
    constructor(publicKey: Uint8Array);
    static deserialize(payload: Uint8Array): PublicKey;
    get size(): number;
    serialize(): Uint8Array;
}
