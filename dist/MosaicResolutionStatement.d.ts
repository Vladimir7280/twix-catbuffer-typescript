import { MosaicResolutionEntry } from './MosaicResolutionEntry';
import { Serializer } from './Serializer';
import { UnresolvedMosaicId } from './UnresolvedMosaicId';
export interface MosaicResolutionStatementParams {
    unresolved: UnresolvedMosaicId;
    resolutionEntries: MosaicResolutionEntry[];
}
export declare class MosaicResolutionStatement implements Serializer {
    readonly unresolved: UnresolvedMosaicId;
    readonly resolutionEntries: MosaicResolutionEntry[];
    constructor({ unresolved, resolutionEntries }: MosaicResolutionStatementParams);
    static deserialize(payload: Uint8Array): MosaicResolutionStatement;
    get size(): number;
    serialize(): Uint8Array;
}
