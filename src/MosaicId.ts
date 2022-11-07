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
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * A [Mosaic](/concepts/mosaic.html) identifier.
 */
export class MosaicId implements Serializer {
    /**
     * A [Mosaic](/concepts/mosaic.html) identifier.
     */
    public readonly mosaicId: bigint;

    /**
     * Constructor
     * @param mosaicId - A [Mosaic](/concepts/mosaic.html) identifier.
     */
    constructor(mosaicId: bigint) {
        this.mosaicId = mosaicId;
    }

    /**
     * Creates an instance of MosaicId from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of MosaicId from binary payload
     */
    public static deserialize(payload: Uint8Array): MosaicId {
        const mosaicId = Utils.bufferToBigInt(Uint8Array.from(payload));
        return new MosaicId(mosaicId);
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        return 8;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        return Utils.bigIntToBuffer(this.mosaicId);
    }
}
