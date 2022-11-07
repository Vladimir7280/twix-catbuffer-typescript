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
 * A 32-byte (256 bit) hash.
The exact algorithm is unspecified as it can change depending on where it is used.
 */
export class Hash256 implements Serializer {
    /**
     * A 32-byte (256 bit) hash.
The exact algorithm is unspecified as it can change depending on where it is used.
     */
    public readonly hash256: Uint8Array;

    /**
     * Constructor
     * @param hash256 - A 32-byte (256 bit) hash.
The exact algorithm is unspecified as it can change depending on where it is used.
     */
    constructor(hash256: Uint8Array) {
        this.hash256 = hash256;
    }

    /**
     * Creates an instance of Hash256 from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of Hash256 from binary payload
     */
    public static deserialize(payload: Uint8Array): Hash256 {
        const hash256 = Utils.getBytes(Uint8Array.from(payload), 32);
        return new Hash256(hash256);
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        return 32;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        return this.hash256;
    }
}
