/*
 * Copyright 2021 SYMBOL
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { HeightActivityBucket } from './HeightActivityBucket';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * account activity buckets
 */
export class HeightActivityBuckets implements Serializer {
    /**
     * account activity buckets
     */
    public readonly buckets: HeightActivityBucket[];

    /**
     * Constructor
     * @param buckets - account activity buckets
     */
    constructor(buckets: HeightActivityBucket[]) {
        this.buckets = buckets;
    }

    /**
     * Creates an instance of HeightActivityBuckets from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of HeightActivityBuckets from binary payload
     */
    public static deserialize(payload: Uint8Array): HeightActivityBuckets {
        const byteArray = Array.from(payload);
        const buckets = Utils.deserialize(HeightActivityBucket.deserialize, Uint8Array.from(byteArray), 5);
        byteArray.splice(0, buckets.reduce((sum, c) => sum + c.size, 0));
        return new HeightActivityBuckets(buckets);
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += this.buckets.reduce((sum, c) => sum + Utils.getSizeWithPadding(c.size, 0), 0); // buckets;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const bucketsBytes = Utils.writeList(this.buckets, 0);
        newArray = Utils.concatTypedArrays(newArray, bucketsBytes);
        return newArray;
    }
}
