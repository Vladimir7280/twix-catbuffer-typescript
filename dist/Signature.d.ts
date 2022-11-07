import { Serializer } from './Serializer';
export declare class Signature implements Serializer {
    readonly signature: Uint8Array;
    constructor(signature: Uint8Array);
    static deserialize(payload: Uint8Array): Signature;
    get size(): number;
    serialize(): Uint8Array;
}
