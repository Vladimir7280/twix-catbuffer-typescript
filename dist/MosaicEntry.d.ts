import { Amount } from './Amount';
import { MosaicDefinition } from './MosaicDefinition';
import { MosaicId } from './MosaicId';
import { Serializer } from './Serializer';
export interface MosaicEntryParams {
    version: number;
    mosaicId: MosaicId;
    supply: Amount;
    definition: MosaicDefinition;
}
export declare class MosaicEntry implements Serializer {
    readonly version: number;
    readonly mosaicId: MosaicId;
    readonly supply: Amount;
    readonly definition: MosaicDefinition;
    constructor({ version, mosaicId, supply, definition }: MosaicEntryParams);
    static deserialize(payload: Uint8Array): MosaicEntry;
    get size(): number;
    serialize(): Uint8Array;
}
