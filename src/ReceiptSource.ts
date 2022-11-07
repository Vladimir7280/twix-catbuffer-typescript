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
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of ReceiptSource
 */
export interface ReceiptSourceParams {
    /**
     * Transaction primary source (e.g. index within the block).
     */
    primaryId: number;
    /**
     * Transaction secondary source (e.g. index within aggregate).
     */
    secondaryId: number;
}

/**
 * The transaction inside the block that triggered the receipt.
 */
export class ReceiptSource implements Serializer {
    /**
     * Transaction primary source (e.g. index within the block).
     */
    public readonly primaryId: number;
    /**
     * Transaction secondary source (e.g. index within aggregate).
     */
    public readonly secondaryId: number;

    /**
     * Constructor
     * @param primaryId - Transaction primary source (e.g. index within the block).
     * @param secondaryId - Transaction secondary source (e.g. index within aggregate).
     */
    constructor({ primaryId, secondaryId }: ReceiptSourceParams) {
        this.primaryId = primaryId;
        this.secondaryId = secondaryId;
    }

    /**
     * Creates an instance of ReceiptSource from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of ReceiptSource from binary payload
     */
    public static deserialize(payload: Uint8Array): ReceiptSource {
        const byteArray = Array.from(payload);
        const primaryId = Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const secondaryId = Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        return new ReceiptSource({ primaryId: primaryId, secondaryId: secondaryId });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += 4; // primaryId;
        size += 4; // secondaryId;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const primaryIdBytes = Utils.uint32ToBuffer(this.primaryId);
        newArray = Utils.concatTypedArrays(newArray, primaryIdBytes);
        const secondaryIdBytes = Utils.uint32ToBuffer(this.secondaryId);
        newArray = Utils.concatTypedArrays(newArray, secondaryIdBytes);
        return newArray;
    }
}
