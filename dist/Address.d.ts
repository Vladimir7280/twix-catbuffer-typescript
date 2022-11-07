import { Serializer } from './Serializer';
export declare class Address implements Serializer {
    readonly address: Uint8Array;
    constructor(address: Uint8Array);
    static deserialize(payload: Uint8Array): Address;
    get size(): number;
    serialize(): Uint8Array;
}
