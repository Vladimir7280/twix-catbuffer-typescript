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
 * Interface to create instances of MetadataValue
 */
export interface MetadataValueParams {
    /**
     * data of the value
     */
    data: Uint8Array;
}

/**
 * binary layout of a metadata entry value
 */
export class MetadataValue implements Serializer {
    /**
     * data of the value
     */
    public readonly data: Uint8Array;

    /**
     * Constructor
     * @param data - data of the value
     */
    constructor({ data }: MetadataValueParams) {
        this.data = data;
    }

    /**
     * Creates an instance of MetadataValue from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of MetadataValue from binary payload
     */
    public static deserialize(payload: Uint8Array): MetadataValue {
        const byteArray = Array.from(payload);
        const size = Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const data = Utils.getBytes(Uint8Array.from(byteArray), size);
        byteArray.splice(0, size);
        return new MetadataValue({ data: data });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += 2; // size;
        size += this.data.length; // data;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const sizeBytes = Utils.uint16ToBuffer(this.data.length);
        newArray = Utils.concatTypedArrays(newArray, sizeBytes);
        const dataBytes = this.data;
        newArray = Utils.concatTypedArrays(newArray, dataBytes);
        return newArray;
    }
}
