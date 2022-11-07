import { Address } from './Address';
import { MetadataType } from './MetadataType';
import { MetadataValue } from './MetadataValue';
import { ScopedMetadataKey } from './ScopedMetadataKey';
import { Serializer } from './Serializer';
export interface MetadataEntryParams {
    version: number;
    sourceAddress: Address;
    targetAddress: Address;
    scopedMetadataKey: ScopedMetadataKey;
    targetId: bigint;
    metadataType: MetadataType;
    value: MetadataValue;
}
export declare class MetadataEntry implements Serializer {
    readonly version: number;
    readonly sourceAddress: Address;
    readonly targetAddress: Address;
    readonly scopedMetadataKey: ScopedMetadataKey;
    readonly targetId: bigint;
    readonly metadataType: MetadataType;
    readonly value: MetadataValue;
    constructor({ version, sourceAddress, targetAddress, scopedMetadataKey, targetId, metadataType, value }: MetadataEntryParams);
    static deserialize(payload: Uint8Array): MetadataEntry;
    get size(): number;
    serialize(): Uint8Array;
}
