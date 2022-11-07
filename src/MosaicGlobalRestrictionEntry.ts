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
import { GlobalKeyValueSet } from './GlobalKeyValueSet';
import { MosaicId } from './MosaicId';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of MosaicGlobalRestrictionEntry
 */
export interface MosaicGlobalRestrictionEntryParams {
    /**
     * identifier of the mosaic to which the restriction applies
     */
    mosaicId: MosaicId;
    /**
     * global key value restriction set
     */
    keyPairs: GlobalKeyValueSet;
}

/**
 * binary layout for a mosaic restriction
 */
export class MosaicGlobalRestrictionEntry implements Serializer {
    /**
     * identifier of the mosaic to which the restriction applies
     */
    public readonly mosaicId: MosaicId;
    /**
     * global key value restriction set
     */
    public readonly keyPairs: GlobalKeyValueSet;

    /**
     * Constructor
     * @param mosaicId - identifier of the mosaic to which the restriction applies
     * @param keyPairs - global key value restriction set
     */
    constructor({ mosaicId, keyPairs }: MosaicGlobalRestrictionEntryParams) {
        this.mosaicId = mosaicId;
        this.keyPairs = keyPairs;
    }

    /**
     * Creates an instance of MosaicGlobalRestrictionEntry from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of MosaicGlobalRestrictionEntry from binary payload
     */
    public static deserialize(payload: Uint8Array): MosaicGlobalRestrictionEntry {
        const byteArray = Array.from(payload);
        const mosaicId = MosaicId.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.size);
        const keyPairs = GlobalKeyValueSet.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, keyPairs.size);
        return new MosaicGlobalRestrictionEntry({ mosaicId: mosaicId, keyPairs: keyPairs });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += this.mosaicId.size; // mosaicId;
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
        const keyPairsBytes = this.keyPairs.serialize();
        newArray = Utils.concatTypedArrays(newArray, keyPairsBytes);
        return newArray;
    }
}
