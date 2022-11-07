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
import { MosaicId } from './MosaicId';
import { NamespaceAliasType } from './NamespaceAliasType';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of NamespaceAlias
 */
export interface NamespaceAliasParams {
    /**
     * namespace alias type
     */
    namespaceAliasType: NamespaceAliasType;
    /**
     * mosaic alias
     */
    mosaicAlias?: MosaicId;
    /**
     * address alias
     */
    addressAlias?: Address;
}

/**
 * binary layout for alias
 */
export class NamespaceAlias implements Serializer {
    /**
     * namespace alias type
     */
    public readonly namespaceAliasType: NamespaceAliasType;
    /**
     * mosaic alias
     */
    public readonly mosaicAlias?: MosaicId;
    /**
     * address alias
     */
    public readonly addressAlias?: Address;

    /**
     * Constructor
     * @param namespaceAliasType - namespace alias type
     * @param mosaicAlias - mosaic alias
     * @param addressAlias - address alias
     */
    constructor({ namespaceAliasType, mosaicAlias, addressAlias }: NamespaceAliasParams) {
        this.namespaceAliasType = namespaceAliasType;
        this.mosaicAlias = mosaicAlias;
        this.addressAlias = addressAlias;
    }

    /**
     * Creates an instance of NamespaceAlias from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of NamespaceAlias from binary payload
     */
    public static deserialize(payload: Uint8Array): NamespaceAlias {
        const byteArray = Array.from(payload);
        const namespaceAliasType = Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        let mosaicAlias: MosaicId | undefined;
        if (namespaceAliasType === NamespaceAliasType.MOSAIC_ID) {
            mosaicAlias = MosaicId.deserialize(Uint8Array.from(byteArray));
            byteArray.splice(0, mosaicAlias.size);
        }
        let addressAlias: Address | undefined;
        if (namespaceAliasType === NamespaceAliasType.ADDRESS) {
            addressAlias = Address.deserialize(Uint8Array.from(byteArray));
            byteArray.splice(0, addressAlias.size);
        }
        return new NamespaceAlias({ namespaceAliasType: namespaceAliasType, mosaicAlias: mosaicAlias, addressAlias: addressAlias });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += 1; // namespaceAliasType;
        if (this.namespaceAliasType === NamespaceAliasType.MOSAIC_ID) {
            size += this.mosaicAlias!.size; // mosaicAlias;
        }
        if (this.namespaceAliasType === NamespaceAliasType.ADDRESS) {
            size += this.addressAlias!.size; // addressAlias;
        }
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const namespaceAliasTypeBytes = Utils.uint8ToBuffer(this.namespaceAliasType);
        newArray = Utils.concatTypedArrays(newArray, namespaceAliasTypeBytes);
        if (this.namespaceAliasType === NamespaceAliasType.MOSAIC_ID) {
            const mosaicAliasBytes = this.mosaicAlias!.serialize();
            newArray = Utils.concatTypedArrays(newArray, mosaicAliasBytes);
        }
        if (this.namespaceAliasType === NamespaceAliasType.ADDRESS) {
            const addressAliasBytes = this.addressAlias!.serialize();
            newArray = Utils.concatTypedArrays(newArray, addressAliasBytes);
        }
        return newArray;
    }
}
