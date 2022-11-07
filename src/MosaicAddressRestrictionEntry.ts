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
import { AddressKeyValueSet } from './AddressKeyValueSet';
import { MosaicId } from './MosaicId';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of MosaicAddressRestrictionEntry
 */
export interface MosaicAddressRestrictionEntryParams {
    /**
     * identifier of the mosaic to which the restriction applies
     */
    mosaicId: MosaicId;
    /**
     * address being restricted
     */
    address: Address;
    /**
     * address key value restriction set
     */
    keyPairs: AddressKeyValueSet;
}

/**
 * binary layout for a mosaic restriction
 */
export class MosaicAddressRestrictionEntry implements Serializer {
    /**
     * identifier of the mosaic to which the restriction applies
     */
    public readonly mosaicId: MosaicId;
    /**
     * address being restricted
     */
    public readonly address: Address;
    /**
     * address key value restriction set
     */
    public readonly keyPairs: AddressKeyValueSet;

    /**
     * Constructor
     * @param mosaicId - identifier of the mosaic to which the restriction applies
     * @param address - address being restricted
     * @param keyPairs - address key value restriction set
     */
    constructor({ mosaicId, address, keyPairs }: MosaicAddressRestrictionEntryParams) {
        this.mosaicId = mosaicId;
        this.address = address;
        this.keyPairs = keyPairs;
    }

    /**
     * Creates an instance of MosaicAddressRestrictionEntry from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of MosaicAddressRestrictionEntry from binary payload
     */
    public static deserialize(payload: Uint8Array): MosaicAddressRestrictionEntry {
        const byteArray = Array.from(payload);
        const mosaicId = MosaicId.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.size);
        const address = Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, address.size);
        const keyPairs = AddressKeyValueSet.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, keyPairs.size);
        return new MosaicAddressRestrictionEntry({ mosaicId: mosaicId, address: address, keyPairs: keyPairs });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += this.mosaicId.size; // mosaicId;
        size += this.address.size; // address;
        size += this.keyPairs.size; // keyPairs;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = Utils.concatTypedArrays(newArray, mosaicIdBytes);
        const addressBytes = this.address.serialize();
        newArray = Utils.concatTypedArrays(newArray, addressBytes);
        const keyPairsBytes = this.keyPairs.serialize();
        newArray = Utils.concatTypedArrays(newArray, keyPairsBytes);
        return newArray;
    }
}
