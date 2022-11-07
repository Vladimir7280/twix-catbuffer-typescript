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
import { Amount } from './Amount';
import { ImportanceHeight } from './ImportanceHeight';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of HeightActivityBucket
 */
export interface HeightActivityBucketParams {
    /**
     * activity start height
     */
    startHeight: ImportanceHeight;
    /**
     * total fees paid by account
     */
    totalFeesPaid: Amount;
    /**
     * number of times account has been used as a beneficiary
     */
    beneficiaryCount: number;
    /**
     * raw importance score
     */
    rawScore: bigint;
}

/**
 * account activity bucket
 */
export class HeightActivityBucket implements Serializer {
    /**
     * activity start height
     */
    public readonly startHeight: ImportanceHeight;
    /**
     * total fees paid by account
     */
    public readonly totalFeesPaid: Amount;
    /**
     * number of times account has been used as a beneficiary
     */
    public readonly beneficiaryCount: number;
    /**
     * raw importance score
     */
    public readonly rawScore: bigint;

    /**
     * Constructor
     * @param startHeight - activity start height
     * @param totalFeesPaid - total fees paid by account
     * @param beneficiaryCount - number of times account has been used as a beneficiary
     * @param rawScore - raw importance score
     */
    constructor({ startHeight, totalFeesPaid, beneficiaryCount, rawScore }: HeightActivityBucketParams) {
        this.startHeight = startHeight;
        this.totalFeesPaid = totalFeesPaid;
        this.beneficiaryCount = beneficiaryCount;
        this.rawScore = rawScore;
    }

    /**
     * Creates an instance of HeightActivityBucket from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of HeightActivityBucket from binary payload
     */
    public static deserialize(payload: Uint8Array): HeightActivityBucket {
        const byteArray = Array.from(payload);
        const startHeight = ImportanceHeight.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, startHeight.size);
        const totalFeesPaid = Amount.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, totalFeesPaid.size);
        const beneficiaryCount = Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const rawScore = Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        return new HeightActivityBucket({
            startHeight: startHeight,
            totalFeesPaid: totalFeesPaid,
            beneficiaryCount: beneficiaryCount,
            rawScore: rawScore,
        });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += this.startHeight.size; // startHeight;
        size += this.totalFeesPaid.size; // totalFeesPaid;
        size += 4; // beneficiaryCount;
        size += 8; // rawScore;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const startHeightBytes = this.startHeight.serialize();
        newArray = Utils.concatTypedArrays(newArray, startHeightBytes);
        const totalFeesPaidBytes = this.totalFeesPaid.serialize();
        newArray = Utils.concatTypedArrays(newArray, totalFeesPaidBytes);
        const beneficiaryCountBytes = Utils.uint32ToBuffer(this.beneficiaryCount);
        newArray = Utils.concatTypedArrays(newArray, beneficiaryCountBytes);
        const rawScoreBytes = Utils.bigIntToBuffer(this.rawScore);
        newArray = Utils.concatTypedArrays(newArray, rawScoreBytes);
        return newArray;
    }
}
