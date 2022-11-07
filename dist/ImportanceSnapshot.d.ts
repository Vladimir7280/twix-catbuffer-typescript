import { Importance } from './Importance';
import { ImportanceHeight } from './ImportanceHeight';
import { Serializer } from './Serializer';
export interface ImportanceSnapshotParams {
    importance: Importance;
    height: ImportanceHeight;
}
export declare class ImportanceSnapshot implements Serializer {
    readonly importance: Importance;
    readonly height: ImportanceHeight;
    constructor({ importance, height }: ImportanceSnapshotParams);
    static deserialize(payload: Uint8Array): ImportanceSnapshot;
    get size(): number;
    serialize(): Uint8Array;
}
