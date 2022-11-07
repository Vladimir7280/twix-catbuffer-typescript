import { FinalizationEpoch } from './FinalizationEpoch';
import { FinalizationPoint } from './FinalizationPoint';
import { Serializer } from './Serializer';
export interface FinalizationRoundParams {
    epoch: FinalizationEpoch;
    point: FinalizationPoint;
}
export declare class FinalizationRound implements Serializer {
    readonly epoch: FinalizationEpoch;
    readonly point: FinalizationPoint;
    constructor({ epoch, point }: FinalizationRoundParams);
    static deserialize(payload: Uint8Array): FinalizationRound;
    get size(): number;
    serialize(): Uint8Array;
}
