import { MosaicId } from './MosaicId';
import { MosaicRestrictionType } from './MosaicRestrictionType';
import { Serializer } from './Serializer';
export interface RestrictionRuleParams {
    referenceMosaicId: MosaicId;
    restrictionValue: bigint;
    restrictionType: MosaicRestrictionType;
}
export declare class RestrictionRule implements Serializer {
    readonly referenceMosaicId: MosaicId;
    readonly restrictionValue: bigint;
    readonly restrictionType: MosaicRestrictionType;
    constructor({ referenceMosaicId, restrictionValue, restrictionType }: RestrictionRuleParams);
    static deserialize(payload: Uint8Array): RestrictionRule;
    get size(): number;
    serialize(): Uint8Array;
}
