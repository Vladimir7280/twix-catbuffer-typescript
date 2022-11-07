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
import { BlockDuration } from './BlockDuration';
import { MosaicFlags } from './MosaicFlags';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of MosaicProperties
 */
export interface MosaicPropertiesParams {
    /**
     * mosaic flags
     */
    flags: MosaicFlags[];
    /**
     * mosaic divisibility
     */
    divisibility: number;
    /**
     * mosaic duration
     */
    duration: BlockDuration;
}

/**
 * binary layout for mosaic properties
 */
export class MosaicProperties implements Serializer {
    /**
     * mosaic flags
     */
    public readonly flags: MosaicFlags[];
    /**
     * mosaic divisibility
     */
    public readonly divisibility: number;
    /**
     * mosaic duration
     */
    public readonly duration: BlockDuration;

    /**
     * Constructor
     * @param flags - mosaic flags
     * @param divisibility - mosaic divisibility
     * @param duration - mosaic duration
     */
    constructor({ flags, divisibility, duration }: MosaicPropertiesParams) {
        this.flags = flags;
        this.divisibility = divisibility;
        this.duration = duration;
    }

    /**
     * Creates an instance of MosaicProperties from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of MosaicProperties from binary payload
     */
    public static deserialize(payload: Uint8Array): MosaicProperties {
        const byteArray = Array.from(payload);
        const flags = Utils.toFlags(MosaicFlags, Utils.bufferToUint8(Uint8Array.from(byteArray)));
        byteArray.splice(0, 1);
        const divisibility = Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const duration = BlockDuration.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, duration.size);
        return new MosaicProperties({ flags: flags, divisibility: divisibility, duration: duration });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += 1; // flags;
        size += 1; // divisibility;
        size += this.duration.size; // duration;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const flagsBytes = Utils.uint8ToBuffer(Utils.fromFlags(MosaicFlags, this.flags));
        newArray = Utils.concatTypedArrays(newArray, flagsBytes);
        const divisibilityBytes = Utils.uint8ToBuffer(this.divisibility);
        newArray = Utils.concatTypedArrays(newArray, divisibilityBytes);
        const durationBytes = this.duration.serialize();
        newArray = Utils.concatTypedArrays(newArray, durationBytes);
        return newArray;
    }
}
