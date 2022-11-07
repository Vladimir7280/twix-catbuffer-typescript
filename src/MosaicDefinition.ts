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
import { Height } from './Height';
import { MosaicProperties } from './MosaicProperties';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of MosaicDefinition
 */
export interface MosaicDefinitionParams {
    /**
     * block height
     */
    startHeight: Height;
    /**
     * mosaic owner
     */
    ownerAddress: Address;
    /**
     * revision
     */
    revision: number;
    /**
     * properties
     */
    properties: MosaicProperties;
}

/**
 * binary layout for mosaic definition
 */
export class MosaicDefinition implements Serializer {
    /**
     * block height
     */
    public readonly startHeight: Height;
    /**
     * mosaic owner
     */
    public readonly ownerAddress: Address;
    /**
     * revision
     */
    public readonly revision: number;
    /**
     * properties
     */
    public readonly properties: MosaicProperties;

    /**
     * Constructor
     * @param startHeight - block height
     * @param ownerAddress - mosaic owner
     * @param revision - revision
     * @param properties - properties
     */
    constructor({ startHeight, ownerAddress, revision, properties }: MosaicDefinitionParams) {
        this.startHeight = startHeight;
        this.ownerAddress = ownerAddress;
        this.revision = revision;
        this.properties = properties;
    }

    /**
     * Creates an instance of MosaicDefinition from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of MosaicDefinition from binary payload
     */
    public static deserialize(payload: Uint8Array): MosaicDefinition {
        const byteArray = Array.from(payload);
        const startHeight = Height.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, startHeight.size);
        const ownerAddress = Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, ownerAddress.size);
        const revision = Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const properties = MosaicProperties.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, properties.size);
        return new MosaicDefinition({ startHeight: startHeight, ownerAddress: ownerAddress, revision: revision, properties: properties });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += this.startHeight.size; // startHeight;
        size += this.ownerAddress.size; // ownerAddress;
        size += 4; // revision;
        size += this.properties.size; // properties;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const startHeightBytes = this.startHeight.serialize();
        newArray = Utils.concatTypedArrays(newArray, startHeightBytes);
        const ownerAddressBytes = this.ownerAddress.serialize();
        newArray = Utils.concatTypedArrays(newArray, ownerAddressBytes);
        const revisionBytes = Utils.uint32ToBuffer(this.revision);
        newArray = Utils.concatTypedArrays(newArray, revisionBytes);
        const propertiesBytes = this.properties.serialize();
        newArray = Utils.concatTypedArrays(newArray, propertiesBytes);
        return newArray;
    }
}
