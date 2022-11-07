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
import { AddressResolutionStatement } from './AddressResolutionStatement';
import { MosaicResolutionStatement } from './MosaicResolutionStatement';
import { Serializer } from './Serializer';
import { TransactionStatement } from './TransactionStatement';
import { Utils } from './Utils';

/**
 * Interface to create instances of BlockStatement
 */
export interface BlockStatementParams {
    /**
     * Transaction statements.
     */
    transactionStatements: TransactionStatement[];
    /**
     * Address resolution statements.
     */
    addressResolutionStatements: AddressResolutionStatement[];
    /**
     * Mosaic resolution statements.
     */
    mosaicResolutionStatements: MosaicResolutionStatement[];
}

/**
 * Collection of statements scoped to a block.
 */
export class BlockStatement implements Serializer {
    /**
     * Transaction statements.
     */
    public readonly transactionStatements: TransactionStatement[];
    /**
     * Address resolution statements.
     */
    public readonly addressResolutionStatements: AddressResolutionStatement[];
    /**
     * Mosaic resolution statements.
     */
    public readonly mosaicResolutionStatements: MosaicResolutionStatement[];

    /**
     * Constructor
     * @param transactionStatements - Transaction statements.
     * @param addressResolutionStatements - Address resolution statements.
     * @param mosaicResolutionStatements - Mosaic resolution statements.
     */
    constructor({ transactionStatements, addressResolutionStatements, mosaicResolutionStatements }: BlockStatementParams) {
        this.transactionStatements = transactionStatements;
        this.addressResolutionStatements = addressResolutionStatements;
        this.mosaicResolutionStatements = mosaicResolutionStatements;
    }

    /**
     * Creates an instance of BlockStatement from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of BlockStatement from binary payload
     */
    public static deserialize(payload: Uint8Array): BlockStatement {
        const byteArray = Array.from(payload);
        const transactionStatementCount = Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const transactionStatements = Utils.deserialize(TransactionStatement.deserialize, Uint8Array.from(byteArray), transactionStatementCount);
        byteArray.splice(0, transactionStatements.reduce((sum, c) => sum + c.size, 0));
        const addressResolutionStatementCount = Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const addressResolutionStatements = Utils.deserialize(
            AddressResolutionStatement.deserialize,
            Uint8Array.from(byteArray),
            addressResolutionStatementCount,
        );
        byteArray.splice(0, addressResolutionStatements.reduce((sum, c) => sum + c.size, 0));
        const mosaicResolutionStatementCount = Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const mosaicResolutionStatements = Utils.deserialize(
            MosaicResolutionStatement.deserialize,
            Uint8Array.from(byteArray),
            mosaicResolutionStatementCount,
        );
        byteArray.splice(0, mosaicResolutionStatements.reduce((sum, c) => sum + c.size, 0));
        return new BlockStatement({
            transactionStatements: transactionStatements,
            addressResolutionStatements: addressResolutionStatements,
            mosaicResolutionStatements: mosaicResolutionStatements,
        });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += 4; // transactionStatementCount;
        size += this.transactionStatements.reduce((sum, c) => sum + Utils.getSizeWithPadding(c.size, 0), 0); // transactionStatements;
        size += 4; // addressResolutionStatementCount;
        size += this.addressResolutionStatements.reduce((sum, c) => sum + Utils.getSizeWithPadding(c.size, 0), 0); // addressResolutionStatements;
        size += 4; // mosaicResolutionStatementCount;
        size += this.mosaicResolutionStatements.reduce((sum, c) => sum + Utils.getSizeWithPadding(c.size, 0), 0); // mosaicResolutionStatements;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const transactionStatementCountBytes = Utils.uint32ToBuffer(this.transactionStatements.length);
        newArray = Utils.concatTypedArrays(newArray, transactionStatementCountBytes);
        const transactionStatementsBytes = Utils.writeList(this.transactionStatements, 0);
        newArray = Utils.concatTypedArrays(newArray, transactionStatementsBytes);
        const addressResolutionStatementCountBytes = Utils.uint32ToBuffer(this.addressResolutionStatements.length);
        newArray = Utils.concatTypedArrays(newArray, addressResolutionStatementCountBytes);
        const addressResolutionStatementsBytes = Utils.writeList(this.addressResolutionStatements, 0);
        newArray = Utils.concatTypedArrays(newArray, addressResolutionStatementsBytes);
        const mosaicResolutionStatementCountBytes = Utils.uint32ToBuffer(this.mosaicResolutionStatements.length);
        newArray = Utils.concatTypedArrays(newArray, mosaicResolutionStatementCountBytes);
        const mosaicResolutionStatementsBytes = Utils.writeList(this.mosaicResolutionStatements, 0);
        newArray = Utils.concatTypedArrays(newArray, mosaicResolutionStatementsBytes);
        return newArray;
    }
}
