import { BlockDuration } from './BlockDuration';
import { MosaicFlags } from './MosaicFlags';
import { Serializer } from './Serializer';
export interface MosaicPropertiesParams {
    flags: MosaicFlags[];
    divisibility: number;
    duration: BlockDuration;
}
export declare class MosaicProperties implements Serializer {
    readonly flags: MosaicFlags[];
    readonly divisibility: number;
    readonly duration: BlockDuration;
    constructor({ flags, divisibility, duration }: MosaicPropertiesParams);
    static deserialize(payload: Uint8Array): MosaicProperties;
    get size(): number;
    serialize(): Uint8Array;
}
