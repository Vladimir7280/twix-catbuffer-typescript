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
import { FinalizationEpoch } from './FinalizationEpoch';
import { FinalizationPoint } from './FinalizationPoint';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of FinalizationRound
 */
export interface FinalizationRoundParams {
    /**
     * finalization epoch
     */
    epoch: FinalizationEpoch;
    /**
     * finalization point
     */
    point: FinalizationPoint;
}

/**
 * binary layout for finalization round
 */
export class FinalizationRound implements Serializer {
    /**
     * finalization epoch
     */
    public readonly epoch: FinalizationEpoch;
    /**
     * finalization point
     */
    public readonly point: FinalizationPoint;

    /**
     * Constructor
     * @param epoch - finalization epoch
     * @param point - finalization point
     */
    constructor({ epoch, point }: FinalizationRoundParams) {
        this.epoch = epoch;
        this.point = point;
    }

    /**
     * Creates an instance of FinalizationRound from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of FinalizationRound from binary payload
     */
    public static deserialize(payload: Uint8Array): FinalizationRound {
        const byteArray = Array.from(payload);
        const epoch = FinalizationEpoch.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, epoch.size);
        const point = FinalizationPoint.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, point.size);
        return new FinalizationRound({ epoch: epoch, point: point });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += this.epoch.size; // epoch;
        size += this.point.size; // point;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const epochBytes = this.epoch.serialize();
        newArray = Utils.concatTypedArrays(newArray, epochBytes);
        const pointBytes = this.point.serialize();
        newArray = Utils.concatTypedArrays(newArray, pointBytes);
        return newArray;
    }
}
