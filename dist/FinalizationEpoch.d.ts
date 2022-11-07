import { Serializer } from './Serializer';
export declare class FinalizationEpoch implements Serializer {
    readonly finalizationEpoch: number;
    constructor(finalizationEpoch: number);
    static deserialize(payload: Uint8Array): FinalizationEpoch;
    get size(): number;
    serialize(): Uint8Array;
}
