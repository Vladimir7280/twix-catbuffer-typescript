import { Serializer } from './Serializer';
export declare class FinalizationPoint implements Serializer {
    readonly finalizationPoint: number;
    constructor(finalizationPoint: number);
    static deserialize(payload: Uint8Array): FinalizationPoint;
    get size(): number;
    serialize(): Uint8Array;
}
