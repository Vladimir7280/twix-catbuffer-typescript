import { Serializer } from './Serializer';
export declare class NamespaceId implements Serializer {
    readonly namespaceId: bigint;
    constructor(namespaceId: bigint);
    static deserialize(payload: Uint8Array): NamespaceId;
    get size(): number;
    serialize(): Uint8Array;
}
