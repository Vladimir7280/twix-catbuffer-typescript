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
import { Address } from './Address';
import { ReceiptSource } from './ReceiptSource';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of AddressResolutionEntry
 */
export interface AddressResolutionEntryParams {
    /**
     * Information about the transaction that triggered the receipt.
     */
    source: ReceiptSource;
    /**
     * Resolved Address.
     */
    resolvedValue: Address;
}

/**
 * Actual Address behind a NamespaceId at the time a transaction was confirmed.
 */
export class AddressResolutionEntry implements Serializer {
    /**
     * Information about the transaction that triggered the receipt.
     */
    public readonly source: ReceiptSource;
    /**
     * Resolved Address.
     */
    public readonly resolvedValue: Address;

    /**
     * Constructor
     * @param source - Information about the transaction that triggered the receipt.
     * @param resolvedValue - Resolved Address.
     */
    constructor({ source, resolvedValue }: AddressResolutionEntryParams) {
        this.source = source;
        this.resolvedValue = resolvedValue;
    }

    /**
     * Creates an instance of AddressResolutionEntry from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of AddressResolutionEntry from binary payload
     */
    public static deserialize(payload: Uint8Array): AddressResolutionEntry {
        const byteArray = Array.from(payload);
        const source = ReceiptSource.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, source.size);
        const resolvedValue = Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, resolvedValue.size);
        return new AddressResolutionEntry({ source: source, resolvedValue: resolvedValue });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += this.source.size; // source;
        size += this.resolvedValue.size; // resolvedValue;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const sourceBytes = this.source.serialize();
        newArray = Utils.concatTypedArrays(newArray, sourceBytes);
        const resolvedValueBytes = this.resolvedValue.serialize();
        newArray = Utils.concatTypedArrays(newArray, resolvedValueBytes);
        return newArray;
    }
}
