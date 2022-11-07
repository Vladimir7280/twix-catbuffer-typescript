import { Serializer } from './Serializer';
export declare class Hash256 implements Serializer {
    readonly hash256: Uint8Array;
    constructor(hash256: Uint8Array);
    static deserialize(payload: Uint8Array): Hash256;
    get size(): number;
    serialize(): Uint8Array;
}
