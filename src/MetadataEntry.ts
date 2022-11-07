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
import { MetadataType } from './MetadataType';
import { MetadataValue } from './MetadataValue';
import { ScopedMetadataKey } from './ScopedMetadataKey';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of MetadataEntry
 */
export interface MetadataEntryParams {
    /**
     * serialization version
     */
    version: number;
    /**
     * metadata source address (provider)
     */
    sourceAddress: Address;
    /**
     * metadata target address
     */
    targetAddress: Address;
    /**
     * metadata key scoped to source, target and type
     */
    scopedMetadataKey: ScopedMetadataKey;
    /**
     * target id
     */
    targetId: bigint;
    /**
     * metadata type
     */
    metadataType: MetadataType;
    /**
     * value
     */
    value: MetadataValue;
}

/**
 * binary layout of a metadata entry
 */
export class MetadataEntry implements Serializer {
    /**
     * serialization version
     */
    public readonly version: number;
    /**
     * metadata source address (provider)
     */
    public readonly sourceAddress: Address;
    /**
     * metadata target address
     */
    public readonly targetAddress: Address;
    /**
     * metadata key scoped to source, target and type
     */
    public readonly scopedMetadataKey: ScopedMetadataKey;
    /**
     * target id
     */
    public readonly targetId: bigint;
    /**
     * metadata type
     */
    public readonly metadataType: MetadataType;
    /**
     * value
     */
    public readonly value: MetadataValue;

    /**
     * Constructor
     * @param version - serialization version
     * @param sourceAddress - metadata source address (provider)
     * @param targetAddress - metadata target address
     * @param scopedMetadataKey - metadata key scoped to source, target and type
     * @param targetId - target id
     * @param metadataType - metadata type
     * @param value - value
     */
    constructor({ version, sourceAddress, targetAddress, scopedMetadataKey, targetId, metadataType, value }: MetadataEntryParams) {
        this.version = version;
        this.sourceAddress = sourceAddress;
        this.targetAddress = targetAddress;
        this.scopedMetadataKey = scopedMetadataKey;
        this.targetId = targetId;
        this.metadataType = metadataType;
        this.value = value;
    }

    /**
     * Creates an instance of MetadataEntry from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of MetadataEntry from binary payload
     */
    public static deserialize(payload: Uint8Array): MetadataEntry {
        const byteArray = Array.from(payload);
        const version = Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const sourceAddress = Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, sourceAddress.size);
        const targetAddress = Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, targetAddress.size);
        const scopedMetadataKey = ScopedMetadataKey.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, scopedMetadataKey.size);
        const targetId = Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const metadataType = Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const value = MetadataValue.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, value.size);
        return new MetadataEntry({
            version: version,
            sourceAddress: sourceAddress,
            targetAddress: targetAddress,
            scopedMetadataKey: scopedMetadataKey,
            targetId: targetId,
            metadataType: metadataType,
            value: value,
        });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += 2; // version;
        size += this.sourceAddress.size; // sourceAddress;
        size += this.targetAddress.size; // targetAddress;
        size += this.scopedMetadataKey.size; // scopedMetadataKey;
        size += 8; // targetId;
        size += 1; // metadataType;
        size += this.value.size; // value;
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
        const sourceAddressBytes = this.sourceAddress.serialize();
        newArray = Utils.concatTypedArrays(newArray, sourceAddressBytes);
        const targetAddressBytes = this.targetAddress.serialize();
        newArray = Utils.concatTypedArrays(newArray, targetAddressBytes);
        const scopedMetadataKeyBytes = this.scopedMetadataKey.serialize();
        newArray = Utils.concatTypedArrays(newArray, scopedMetadataKeyBytes);
        const targetIdBytes = Utils.bigIntToBuffer(this.targetId);
        newArray = Utils.concatTypedArrays(newArray, targetIdBytes);
        const metadataTypeBytes = Utils.uint8ToBuffer(this.metadataType);
        newArray = Utils.concatTypedArrays(newArray, metadataTypeBytes);
        const valueBytes = this.value.serialize();
        newArray = Utils.concatTypedArrays(newArray, valueBytes);
        return newArray;
    }
}
