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
import { Receipt } from './Receipt';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of TransactionStatement
 */
export interface TransactionStatementParams {
    /**
     * Transaction primary source (e.g. index within the block).
     */
    primaryId: number;
    /**
     * Transaction secondary source (e.g. index within aggregate).
     */
    secondaryId: number;
    /**
     * Receipts.
     */
    receipts: Receipt[];
}

/**
 * Collection of receipts scoped to a single source (transaction or block).
 */
export class TransactionStatement implements Serializer {
    /**
     * Transaction primary source (e.g. index within the block).
     */
    public readonly primaryId: number;
    /**
     * Transaction secondary source (e.g. index within aggregate).
     */
    public readonly secondaryId: number;
    /**
     * Receipts.
     */
    public readonly receipts: Receipt[];

    /**
     * Constructor
     * @param primaryId - Transaction primary source (e.g. index within the block).
     * @param secondaryId - Transaction secondary source (e.g. index within aggregate).
     * @param receipts - Receipts.
     */
    constructor({ primaryId, secondaryId, receipts }: TransactionStatementParams) {
        this.primaryId = primaryId;
        this.secondaryId = secondaryId;
        this.receipts = receipts;
    }

    /**
     * Creates an instance of TransactionStatement from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of TransactionStatement from binary payload
     */
    public static deserialize(payload: Uint8Array): TransactionStatement {
        const byteArray = Array.from(payload);
        const primaryId = Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const secondaryId = Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const receiptCount = Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const receipts = Utils.deserialize(Receipt.deserialize, Uint8Array.from(byteArray), receiptCount);
        byteArray.splice(0, receipts.reduce((sum, c) => sum + c.size, 0));
        return new TransactionStatement({ primaryId: primaryId, secondaryId: secondaryId, receipts: receipts });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += 4; // primaryId;
        size += 4; // secondaryId;
        size += 4; // receiptCount;
        size += this.receipts.reduce((sum, c) => sum + Utils.getSizeWithPadding(c.size, 0), 0); // receipts;
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
        const receiptCountBytes = Utils.uint32ToBuffer(this.receipts.length);
        newArray = Utils.concatTypedArrays(newArray, receiptCountBytes);
        const receiptsBytes = Utils.writeList(this.receipts, 0);
        newArray = Utils.concatTypedArrays(newArray, receiptsBytes);
        return newArray;
    }
}
