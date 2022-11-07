import { Serializer } from './Serializer';
export declare class ImportanceHeight implements Serializer {
    readonly importanceHeight: bigint;
    constructor(importanceHeight: bigint);
    static deserialize(payload: Uint8Array): ImportanceHeight;
    get size(): number;
    serialize(): Uint8Array;
}
