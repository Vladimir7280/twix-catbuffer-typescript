import { MosaicId } from './MosaicId';
import { Serializer } from './Serializer';
export interface AccountRestrictionMosaicValueParams {
    restrictionValues: MosaicId[];
}
export declare class AccountRestrictionMosaicValue implements Serializer {
    readonly restrictionValues: MosaicId[];
    constructor({ restrictionValues }: AccountRestrictionMosaicValueParams);
    static deserialize(payload: Uint8Array): AccountRestrictionMosaicValue;
    get size(): number;
    serialize(): Uint8Array;
}
