import { HeightActivityBucket } from './HeightActivityBucket';
import { Serializer } from './Serializer';
export declare class HeightActivityBuckets implements Serializer {
    readonly buckets: HeightActivityBucket[];
    constructor(buckets: HeightActivityBucket[]);
    static deserialize(payload: Uint8Array): HeightActivityBuckets;
    get size(): number;
    serialize(): Uint8Array;
}
