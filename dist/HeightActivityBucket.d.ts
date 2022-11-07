import { Amount } from './Amount';
import { ImportanceHeight } from './ImportanceHeight';
import { Serializer } from './Serializer';
export interface HeightActivityBucketParams {
    startHeight: ImportanceHeight;
    totalFeesPaid: Amount;
    beneficiaryCount: number;
    rawScore: bigint;
}
export declare class HeightActivityBucket implements Serializer {
    readonly startHeight: ImportanceHeight;
    readonly totalFeesPaid: Amount;
    readonly beneficiaryCount: number;
    readonly rawScore: bigint;
    constructor({ startHeight, totalFeesPaid, beneficiaryCount, rawScore }: HeightActivityBucketParams);
    static deserialize(payload: Uint8Array): HeightActivityBucket;
    get size(): number;
    serialize(): Uint8Array;
}
