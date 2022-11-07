import { Serializer } from './Serializer';
export declare class Hash512 implements Serializer {
    readonly hash512: Uint8Array;
    constructor(hash512: Uint8Array);
    static deserialize(payload: Uint8Array): Hash512;
    get size(): number;
    serialize(): Uint8Array;
}
