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
 * Either an Address or a NamespaceId.
The **least**-significant bit of the first byte is 0 for Addresses and 1 for NamespaceId's.
 */
export class UnresolvedAddress implements Serializer {
    /**
     * Either an Address or a NamespaceId.
The **least**-significant bit of the first byte is 0 for Addresses and 1 for NamespaceId's.
     */
    public readonly unresolvedAddress: Uint8Array;

    /**
     * Constructor
     * @param unresolvedAddress - Either an Address or a NamespaceId.
The **least**-significant bit of the first byte is 0 for Addresses and 1 for
     * NamespaceId's.
     */
    constructor(unresolvedAddress: Uint8Array) {
        this.unresolvedAddress = unresolvedAddress;
    }

    /**
     * Creates an instance of UnresolvedAddress from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of UnresolvedAddress from binary payload
     */
    public static deserialize(payload: Uint8Array): UnresolvedAddress {
        const unresolvedAddress = Utils.getBytes(Uint8Array.from(payload), 24);
        return new UnresolvedAddress(unresolvedAddress);
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        return 24;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        return this.unresolvedAddress;
    }
}
