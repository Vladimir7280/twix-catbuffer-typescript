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
import { MosaicRestrictionKey } from './MosaicRestrictionKey';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of AddressKeyValue
 */
export interface AddressKeyValueParams {
    /**
     * key for value
     */
    key: MosaicRestrictionKey;
    /**
     * value associated by key
     */
    value: bigint;
}

/**
 * layout for mosaic address restriction key-value pair
 */
export class AddressKeyValue implements Serializer {
    /**
     * key for value
     */
    public readonly key: MosaicRestrictionKey;
    /**
     * value associated by key
     */
    public readonly value: bigint;

    /**
     * Constructor
     * @param key - key for value
     * @param value - value associated by key
     */
    constructor({ key, value }: AddressKeyValueParams) {
        this.key = key;
        this.value = value;
    }

    /**
     * Creates an instance of AddressKeyValue from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of AddressKeyValue from binary payload
     */
    public static deserialize(payload: Uint8Array): AddressKeyValue {
        const byteArray = Array.from(payload);
        const key = MosaicRestrictionKey.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, key.size);
        const value = Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        return new AddressKeyValue({ key: key, value: value });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += this.key.size; // key;
        size += 8; // value;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const keyBytes = this.key.serialize();
        newArray = Utils.concatTypedArrays(newArray, keyBytes);
        const valueBytes = Utils.bigIntToBuffer(this.value);
        newArray = Utils.concatTypedArrays(newArray, valueBytes);
        return newArray;
    }
}
