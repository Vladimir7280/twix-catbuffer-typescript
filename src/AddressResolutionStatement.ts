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
import { AddressResolutionEntry } from './AddressResolutionEntry';
import { Serializer } from './Serializer';
import { UnresolvedAddress } from './UnresolvedAddress';
import { Utils } from './Utils';

/**
 * Interface to create instances of AddressResolutionStatement
 */
export interface AddressResolutionStatementParams {
    /**
     * Unresolved address.
     */
    unresolved: UnresolvedAddress;
    /**
     * Resolution entries.
     */
    resolutionEntries: AddressResolutionEntry[];
}

/**
 * An Address resolution statement links a namespace alias used in a transaction to the real address **at the time of the transaction**.
 */
export class AddressResolutionStatement implements Serializer {
    /**
     * Unresolved address.
     */
    public readonly unresolved: UnresolvedAddress;
    /**
     * Resolution entries.
     */
    public readonly resolutionEntries: AddressResolutionEntry[];

    /**
     * Constructor
     * @param unresolved - Unresolved address.
     * @param resolutionEntries - Resolution entries.
     */
    constructor({ unresolved, resolutionEntries }: AddressResolutionStatementParams) {
        this.unresolved = unresolved;
        this.resolutionEntries = resolutionEntries;
    }

    /**
     * Creates an instance of AddressResolutionStatement from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of AddressResolutionStatement from binary payload
     */
    public static deserialize(payload: Uint8Array): AddressResolutionStatement {
        const byteArray = Array.from(payload);
        const unresolved = UnresolvedAddress.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, unresolved.size);
        const resolutionEntriesCount = Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const resolutionEntries = Utils.deserialize(AddressResolutionEntry.deserialize, Uint8Array.from(byteArray), resolutionEntriesCount);
        byteArray.splice(0, resolutionEntries.reduce((sum, c) => sum + c.size, 0));
        return new AddressResolutionStatement({ unresolved: unresolved, resolutionEntries: resolutionEntries });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += this.unresolved.size; // unresolved;
        size += 4; // resolutionEntriesCount;
        size += this.resolutionEntries.reduce((sum, c) => sum + Utils.getSizeWithPadding(c.size, 0), 0); // resolutionEntries;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const unresolvedBytes = this.unresolved.serialize();
        newArray = Utils.concatTypedArrays(newArray, unresolvedBytes);
        const resolutionEntriesCountBytes = Utils.uint32ToBuffer(this.resolutionEntries.length);
        newArray = Utils.concatTypedArrays(newArray, resolutionEntriesCountBytes);
        const resolutionEntriesBytes = Utils.writeList(this.resolutionEntries, 0);
        newArray = Utils.concatTypedArrays(newArray, resolutionEntriesBytes);
        return newArray;
    }
}
