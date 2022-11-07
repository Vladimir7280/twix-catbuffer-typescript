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
import { Mosaic } from './Mosaic';
import { ReceiptType } from './ReceiptType';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of NamespaceRentalFeeReceipt
 */
export interface NamespaceRentalFeeReceiptParams {
    /**
     * Receipt version.
     */
    version: number;
    /**
     * Type of receipt.
     */
    type: ReceiptType;
    /**
     * Transferred mosaic
     */
    mosaic: Mosaic;
    /**
     * Address of the sender account.
     */
    senderAddress: Address;
    /**
     * Address of the recipient account.
     */
    recipientAddress: Address;
}

/**
 * Receipt generated when a namespace rental fee is paid.
 */
export class NamespaceRentalFeeReceipt implements Serializer {
    /**
     * RECEIPT_TYPE
     */
    public readonly RECEIPT_TYPE = 4942;
    /**
     * Receipt version.
     */
    public readonly version: number;
    /**
     * Type of receipt.
     */
    public readonly type: ReceiptType;
    /**
     * Transferred mosaic
     */
    public readonly mosaic: Mosaic;
    /**
     * Address of the sender account.
     */
    public readonly senderAddress: Address;
    /**
     * Address of the recipient account.
     */
    public readonly recipientAddress: Address;

    /**
     * Constructor
     * @param version - Receipt version.
     * @param type - Type of receipt.
     * @param mosaic - Transferred mosaic
     * @param senderAddress - Address of the sender account.
     * @param recipientAddress - Address of the recipient account.
     */
    constructor({ version, type, mosaic, senderAddress, recipientAddress }: NamespaceRentalFeeReceiptParams) {
        this.version = version;
        this.type = type;
        this.mosaic = mosaic;
        this.senderAddress = senderAddress;
        this.recipientAddress = recipientAddress;
    }

    /**
     * Creates an instance of NamespaceRentalFeeReceipt from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of NamespaceRentalFeeReceipt from binary payload
     */
    public static deserialize(payload: Uint8Array): NamespaceRentalFeeReceipt {
        const byteArray = Array.from(payload);
        const size = Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const version = Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const type = Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const mosaic = Mosaic.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.size);
        const senderAddress = Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, senderAddress.size);
        const recipientAddress = Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, recipientAddress.size);
        return new NamespaceRentalFeeReceipt({
            version: version,
            type: type,
            mosaic: mosaic,
            senderAddress: senderAddress,
            recipientAddress: recipientAddress,
        });
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
        size += this.mosaic.size; // mosaic;
        size += this.senderAddress.size; // senderAddress;
        size += this.recipientAddress.size; // recipientAddress;
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
        const mosaicBytes = this.mosaic.serialize();
        newArray = Utils.concatTypedArrays(newArray, mosaicBytes);
        const senderAddressBytes = this.senderAddress.serialize();
        newArray = Utils.concatTypedArrays(newArray, senderAddressBytes);
        const recipientAddressBytes = this.recipientAddress.serialize();
        newArray = Utils.concatTypedArrays(newArray, recipientAddressBytes);
        return newArray;
    }
}
