import { MosaicRestrictionKey } from './MosaicRestrictionKey';
import { RestrictionRule } from './RestrictionRule';
import { Serializer } from './Serializer';
export interface GlobalKeyValueParams {
    key: MosaicRestrictionKey;
    restrictionRule: RestrictionRule;
}
export declare class GlobalKeyValue implements Serializer {
    readonly key: MosaicRestrictionKey;
    readonly restrictionRule: RestrictionRule;
    constructor({ key, restrictionRule }: GlobalKeyValueParams);
    static deserialize(payload: Uint8Array): GlobalKeyValue;
    get size(): number;
    serialize(): Uint8Array;
}
