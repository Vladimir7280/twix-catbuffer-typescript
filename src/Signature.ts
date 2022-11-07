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
 * A 64-byte (512 bit) array certifying that the signed data has not been modified.
Symbol currently uses [Ed25519](https://ed25519.cr.yp.to/)
 * signatures.
 */
export class Signature implements Serializer {
    /**
     * A 64-byte (512 bit) array certifying that the signed data has not been modified.
Symbol currently uses [Ed25519](https://ed25519.cr.yp.to/)
     * signatures.
     */
    public readonly signature: Uint8Array;

    /**
     * Constructor
     * @param signature - A 64-byte (512 bit) array certifying that the signed data has not been modified.
Symbol currently uses [Ed25519](https://ed25519.cr.yp.to/)
     * signatures.
     */
    constructor(signature: Uint8Array) {
        this.signature = signature;
    }

    /**
     * Creates an instance of Signature from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of Signature from binary payload
     */
    public static deserialize(payload: Uint8Array): Signature {
        const signature = Utils.getBytes(Uint8Array.from(payload), 64);
        return new Signature(signature);
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        return 64;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        return this.signature;
    }
}
