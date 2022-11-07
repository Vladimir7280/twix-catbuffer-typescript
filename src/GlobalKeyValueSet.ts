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
import { GlobalKeyValue } from './GlobalKeyValue';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of GlobalKeyValueSet
 */
export interface GlobalKeyValueSetParams {
    /**
     * key value array
     */
    keys: GlobalKeyValue[];
}

/**
 * binary layout for a global restriction key-value set
 */
export class GlobalKeyValueSet implements Serializer {
    /**
     * key value array
     */
    public readonly keys: GlobalKeyValue[];

    /**
     * Constructor
     * @param keys - key value array
     */
    constructor({ keys }: GlobalKeyValueSetParams) {
        this.keys = keys;
    }

    /**
     * Creates an instance of GlobalKeyValueSet from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of GlobalKeyValueSet from binary payload
     */
    public static deserialize(payload: Uint8Array): GlobalKeyValueSet {
        const byteArray = Array.from(payload);
        const keyValueCount = Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const keys = Utils.deserialize(GlobalKeyValue.deserialize, Uint8Array.from(byteArray), keyValueCount);
        byteArray.splice(0, keys.reduce((sum, c) => sum + c.size, 0));
        return new GlobalKeyValueSet({ keys: keys });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += 1; // keyValueCount;
        size += this.keys.reduce((sum, c) => sum + Utils.getSizeWithPadding(c.size, 0), 0); // keys;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const keyValueCountBytes = Utils.uint8ToBuffer(this.keys.length);
        newArray = Utils.concatTypedArrays(newArray, keyValueCountBytes);
        const keysBytes = Utils.writeList(this.keys, 0);
        newArray = Utils.concatTypedArrays(newArray, keysBytes);
        return newArray;
    }
}
