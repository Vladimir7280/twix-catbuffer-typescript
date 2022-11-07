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
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
import { Utils } from './Utils';

/**
 * Interface to create instances of EmbeddedPriceTransactionV1
 */
export interface EmbeddedPriceTransactionV1Params {
    /**
     * Public key of the signer of the entity.
     */
    signerPublicKey: PublicKey;
    /**
     * Version of this structure.
     */
    version: number;
    /**
     * Network on which this entity was created.
     */
    network: NetworkType;
    /**
     * transaction type
     */
    type: TransactionType;
    /**
     * blockHeight.
     */
    blockheight: Amount;
    /**
     * highPrice.
     */
    highprice: Amount;
    /**
     * lowPrice.
     */
    lowprice: Amount;
}

/**
 * Embedded version of PriceTransaction (V1, latest).
 */
export class EmbeddedPriceTransactionV1 implements Serializer {
    /**
     * TRANSACTION_VERSION
     */
    public readonly TRANSACTION_VERSION = 1;
    /**
     * TRANSACTION_TYPE
     */
    public readonly TRANSACTION_TYPE = 16726;
    /**
     * Public key of the signer of the entity.
     */
    public readonly signerPublicKey: PublicKey;
    /**
     * Version of this structure.
     */
    public readonly version: number;
    /**
     * Network on which this entity was created.
     */
    public readonly network: NetworkType;
    /**
     * transaction type
     */
    public readonly type: TransactionType;
    /**
     * blockHeight.
     */
    public readonly blockheight: Amount;
    /**
     * highPrice.
     */
    public readonly highprice: Amount;
    /**
     * lowPrice.
     */
    public readonly lowprice: Amount;

    /**
     * Constructor
     * @param signerPublicKey - Public key of the signer of the entity.
     * @param version - Version of this structure.
     * @param network - Network on which this entity was created.
     * @param type - transaction type
     * @param blockheight - blockHeight.
     * @param highprice - highPrice.
     * @param lowprice - lowPrice.
     */
    constructor({ signerPublicKey, version, network, type, blockheight, highprice, lowprice }: EmbeddedPriceTransactionV1Params) {
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.blockheight = blockheight;
        this.highprice = highprice;
        this.lowprice = lowprice;
    }

    /**
     * Creates an instance of EmbeddedPriceTransactionV1 from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of EmbeddedPriceTransactionV1 from binary payload
     */
    public static deserialize(payload: Uint8Array): EmbeddedPriceTransactionV1 {
        const byteArray = Array.from(payload);
        const size = Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const signerPublicKey = PublicKey.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, signerPublicKey.size);
        Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const version = Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const network = Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const type = Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const blockheight = Amount.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, blockheight.size);
        const highprice = Amount.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, highprice.size);
        const lowprice = Amount.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, lowprice.size);
        return new EmbeddedPriceTransactionV1({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            blockheight: blockheight,
            highprice: highprice,
            lowprice: lowprice,
        });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += 4; // size;
        size += 4; // embeddedTransactionHeaderReserved_1;
        size += this.signerPublicKey.size; // signerPublicKey;
        size += 4; // entityBodyReserved_1;
        size += 1; // version;
        size += 1; // network;
        size += 2; // type;
        size += this.blockheight.size; // blockheight;
        size += this.highprice.size; // highprice;
        size += this.lowprice.size; // lowprice;
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
        const embeddedTransactionHeaderReserved_1Bytes = Utils.uint32ToBuffer(0);
        newArray = Utils.concatTypedArrays(newArray, embeddedTransactionHeaderReserved_1Bytes);
        const signerPublicKeyBytes = this.signerPublicKey.serialize();
        newArray = Utils.concatTypedArrays(newArray, signerPublicKeyBytes);
        const entityBodyReserved_1Bytes = Utils.uint32ToBuffer(0);
        newArray = Utils.concatTypedArrays(newArray, entityBodyReserved_1Bytes);
        const versionBytes = Utils.uint8ToBuffer(this.version);
        newArray = Utils.concatTypedArrays(newArray, versionBytes);
        const networkBytes = Utils.uint8ToBuffer(this.network);
        newArray = Utils.concatTypedArrays(newArray, networkBytes);
        const typeBytes = Utils.uint16ToBuffer(this.type);
        newArray = Utils.concatTypedArrays(newArray, typeBytes);
        const blockheightBytes = this.blockheight.serialize();
        newArray = Utils.concatTypedArrays(newArray, blockheightBytes);
        const highpriceBytes = this.highprice.serialize();
        newArray = Utils.concatTypedArrays(newArray, highpriceBytes);
        const lowpriceBytes = this.lowprice.serialize();
        newArray = Utils.concatTypedArrays(newArray, lowpriceBytes);
        return newArray;
    }
}