import { Serializer } from './Serializer';
export interface MetadataValueParams {
    data: Uint8Array;
}
export declare class MetadataValue implements Serializer {
    readonly data: Uint8Array;
    constructor({ data }: MetadataValueParams);
    static deserialize(payload: Uint8Array): MetadataValue;
    get size(): number;
    serialize(): Uint8Array;
}
