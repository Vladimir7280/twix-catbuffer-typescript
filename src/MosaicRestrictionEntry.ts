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
import { MosaicAddressRestrictionEntry } from './MosaicAddressRestrictionEntry';
import { MosaicGlobalRestrictionEntry } from './MosaicGlobalRestrictionEntry';
import { MosaicRestrictionEntryType } from './MosaicRestrictionEntryType';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of MosaicRestrictionEntry
 */
export interface MosaicRestrictionEntryParams {
    /**
     * serialization version
     */
    version: number;
    /**
     * type of restriction being placed upon the entity
     */
    entryType: MosaicRestrictionEntryType;
    /**
     * address restriction rule
     */
    addressEntry?: MosaicAddressRestrictionEntry;
    /**
     * global mosaic rule
     */
    globalEntry?: MosaicGlobalRestrictionEntry;
}

/**
 * binary layout for a mosaic restriction
 */
export class MosaicRestrictionEntry implements Serializer {
    /**
     * serialization version
     */
    public readonly version: number;
    /**
     * type of restriction being placed upon the entity
     */
    public readonly entryType: MosaicRestrictionEntryType;
    /**
     * address restriction rule
     */
    public readonly addressEntry?: MosaicAddressRestrictionEntry;
    /**
     * global mosaic rule
     */
    public readonly globalEntry?: MosaicGlobalRestrictionEntry;

    /**
     * Constructor
     * @param version - serialization version
     * @param entryType - type of restriction being placed upon the entity
     * @param addressEntry - address restriction rule
     * @param globalEntry - global mosaic rule
     */
    constructor({ version, entryType, addressEntry, globalEntry }: MosaicRestrictionEntryParams) {
        this.version = version;
        this.entryType = entryType;
        this.addressEntry = addressEntry;
        this.globalEntry = globalEntry;
    }

    /**
     * Creates an instance of MosaicRestrictionEntry from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of MosaicRestrictionEntry from binary payload
     */
    public static deserialize(payload: Uint8Array): MosaicRestrictionEntry {
        const byteArray = Array.from(payload);
        const version = Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const entryType = Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        let addressEntry: MosaicAddressRestrictionEntry | undefined;
        if (entryType === MosaicRestrictionEntryType.ADDRESS) {
            addressEntry = MosaicAddressRestrictionEntry.deserialize(Uint8Array.from(byteArray));
            byteArray.splice(0, addressEntry.size);
        }
        let globalEntry: MosaicGlobalRestrictionEntry | undefined;
        if (entryType === MosaicRestrictionEntryType.GLOBAL) {
            globalEntry = MosaicGlobalRestrictionEntry.deserialize(Uint8Array.from(byteArray));
            byteArray.splice(0, globalEntry.size);
        }
        return new MosaicRestrictionEntry({ version: version, entryType: entryType, addressEntry: addressEntry, globalEntry: globalEntry });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += 2; // version;
        size += 1; // entryType;
        if (this.entryType === MosaicRestrictionEntryType.ADDRESS) {
            size += this.addressEntry!.size; // addressEntry;
        }
        if (this.entryType === MosaicRestrictionEntryType.GLOBAL) {
            size += this.globalEntry!.size; // globalEntry;
        }
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
        const entryTypeBytes = Utils.uint8ToBuffer(this.entryType);
        newArray = Utils.concatTypedArrays(newArray, entryTypeBytes);
        if (this.entryType === MosaicRestrictionEntryType.ADDRESS) {
            const addressEntryBytes = this.addressEntry!.serialize();
            newArray = Utils.concatTypedArrays(newArray, addressEntryBytes);
        }
        if (this.entryType === MosaicRestrictionEntryType.GLOBAL) {
            const globalEntryBytes = this.globalEntry!.serialize();
            newArray = Utils.concatTypedArrays(newArray, globalEntryBytes);
        }
        return newArray;
    }
}
