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
import { NamespaceId } from './NamespaceId';
import { ReceiptType } from './ReceiptType';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of NamespaceDeletedReceipt
 */
export interface NamespaceDeletedReceiptParams {
    /**
     * Receipt version.
     */
    version: number;
    /**
     * Type of receipt.
     */
    type: ReceiptType;
    /**
     * Deleted namespace identifier.
     */
    artifactId: NamespaceId;
}

/**
 * Receipt generated when a [namespace](/concepts/namespace.html) is deleted.
 */
export class NamespaceDeletedReceipt implements Serializer {
    /**
     * RECEIPT_TYPE
     */
    public readonly RECEIPT_TYPE = 16974;
    /**
     * Receipt version.
     */
    public readonly version: number;
    /**
     * Type of receipt.
     */
    public readonly type: ReceiptType;
    /**
     * Deleted namespace identifier.
     */
    public readonly artifactId: NamespaceId;

    /**
     * Constructor
     * @param version - Receipt version.
     * @param type - Type of receipt.
     * @param artifactId - Deleted namespace identifier.
     */
    constructor({ version, type, artifactId }: NamespaceDeletedReceiptParams) {
        this.version = version;
        this.type = type;
        this.artifactId = artifactId;
    }

    /**
     * Creates an instance of NamespaceDeletedReceipt from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of NamespaceDeletedReceipt from binary payload
     */
    public static deserialize(payload: Uint8Array): NamespaceDeletedReceipt {
        const byteArray = Array.from(payload);
        const size = Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const version = Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const type = Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const artifactId = NamespaceId.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, artifactId.size);
        return new NamespaceDeletedReceipt({ version: version, type: type, artifactId: artifactId });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += 4; // size;
        size += 2; // version;
        size += 2; // type;
        size += this.artifactId.size; // artifactId;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const sizeBytes = Utils.uint32ToBuffer(this.size);
        newArray = Utils.concatTypedArrays(newArray, sizeBytes);
        const versionBytes = Utils.uint16ToBuffer(this.version);
        newArray = Utils.concatTypedArrays(newArray, versionBytes);
        const typeBytes = Utils.uint16ToBuffer(this.type);
        newArray = Utils.concatTypedArrays(newArray, typeBytes);
        const artifactIdBytes = this.artifactId.serialize();
        newArray = Utils.concatTypedArrays(newArray, artifactIdBytes);
        return newArray;
    }
}
