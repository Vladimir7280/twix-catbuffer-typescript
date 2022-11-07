import { Serializer } from './Serializer';
export declare class Height implements Serializer {
    readonly height: bigint;
    constructor(height: bigint);
    static deserialize(payload: Uint8Array): Height;
    get size(): number;
    serialize(): Uint8Array;
}
