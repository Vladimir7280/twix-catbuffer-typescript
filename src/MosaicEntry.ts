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
import { Amount } from './Amount';
import { MosaicDefinition } from './MosaicDefinition';
import { MosaicId } from './MosaicId';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of MosaicEntry
 */
export interface MosaicEntryParams {
    /**
     * serialization version
     */
    version: number;
    /**
     * entry id
     */
    mosaicId: MosaicId;
    /**
     * total supply amount
     */
    supply: Amount;
    /**
     * definition comprised of entry properties
     */
    definition: MosaicDefinition;
}

/**
 * binary layout for mosaic entry
 */
export class MosaicEntry implements Serializer {
    /**
     * serialization version
     */
    public readonly version: number;
    /**
     * entry id
     */
    public readonly mosaicId: MosaicId;
    /**
     * total supply amount
     */
    public readonly supply: Amount;
    /**
     * definition comprised of entry properties
     */
    public readonly definition: MosaicDefinition;

    /**
     * Constructor
     * @param version - serialization version
     * @param mosaicId - entry id
     * @param supply - total supply amount
     * @param definition - definition comprised of entry properties
     */
    constructor({ version, mosaicId, supply, definition }: MosaicEntryParams) {
        this.version = version;
        this.mosaicId = mosaicId;
        this.supply = supply;
        this.definition = definition;
    }

    /**
     * Creates an instance of MosaicEntry from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of MosaicEntry from binary payload
     */
    public static deserialize(payload: Uint8Array): MosaicEntry {
        const byteArray = Array.from(payload);
        const version = Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const mosaicId = MosaicId.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.size);
        const supply = Amount.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, supply.size);
        const definition = MosaicDefinition.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, definition.size);
        return new MosaicEntry({ version: version, mosaicId: mosaicId, supply: supply, definition: definition });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += 2; // version;
        size += this.mosaicId.size; // mosaicId;
        size += this.supply.size; // supply;
        size += this.definition.size; // definition;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const versionBytes = Utils.uint16ToBuffer(this.version);
        newArray = Utils.concatTypedArrays(newArray, versionBytes);
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = Utils.concatTypedArrays(newArray, mosaicIdBytes);
        const supplyBytes = this.supply.serialize();
        newArray = Utils.concatTypedArrays(newArray, supplyBytes);
        const definitionBytes = this.definition.serialize();
        newArray = Utils.concatTypedArrays(newArray, definitionBytes);
        return newArray;
    }
}
