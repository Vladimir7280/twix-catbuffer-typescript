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
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
import { UnresolvedAddress } from './UnresolvedAddress';
import { Utils } from './Utils';

/**
 * Interface to create instances of EmbeddedAccountMetadataTransactionV1
 */
export interface EmbeddedAccountMetadataTransactionV1Params {
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
     * Account whose metadata should be modified.
     */
    targetAddress: UnresolvedAddress;
    /**
     * Metadata key scoped to source, target and type.
     */
    scopedMetadataKey: bigint;
    /**
     * Change in value size in bytes, compared to previous size.
     */
    valueSizeDelta: number;
    /**
     * Difference between existing value and new value. *note When there is no existing value, this array is directly used and `value_size_delta`==`value_size`. *note When there is an existing value, the new value is the byte-wise XOR of the previous value and this
     * array.
     */
    value: Uint8Array;
}

/**
 * Embedded version of AccountMetadataTransaction (V1, latest).
 */
export class EmbeddedAccountMetadataTransactionV1 implements Serializer {
    /**
     * TRANSACTION_VERSION
     */
    public readonly TRANSACTION_VERSION = 1;
    /**
     * TRANSACTION_TYPE
     */
    public readonly TRANSACTION_TYPE = 16708;
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
     * Account whose metadata should be modified.
     */
    public readonly targetAddress: UnresolvedAddress;
    /**
     * Metadata key scoped to source, target and type.
     */
    public readonly scopedMetadataKey: bigint;
    /**
     * Change in value size in bytes, compared to previous size.
     */
    public readonly valueSizeDelta: number;
    /**
     * Difference between existing value and new value. *note When there is no existing value, this array is directly used and `value_size_delta`==`value_size`. *note When there is an existing value, the new value is the byte-wise XOR of the previous value and this
     * array.
     */
    public readonly value: Uint8Array;

    /**
     * Constructor
     * @param signerPublicKey - Public key of the signer of the entity.
     * @param version - Version of this structure.
     * @param network - Network on which this entity was created.
     * @param type - transaction type
     * @param targetAddress - Account whose metadata should be modified.
     * @param scopedMetadataKey - Metadata key scoped to source, target and type.
     * @param valueSizeDelta - Change in value size in bytes, compared to previous size.
     * @param value - Difference between existing value and new value. *note When there is no existing value, this array is directly used and `value_size_delta`==`value_size`. *note When there is an existing value, the new value is the byte-wise XOR of the previous value and this
     * array.
     */
    constructor({
        signerPublicKey,
        version,
        network,
        type,
        targetAddress,
        scopedMetadataKey,
        valueSizeDelta,
        value,
    }: EmbeddedAccountMetadataTransactionV1Params) {
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.targetAddress = targetAddress;
        this.scopedMetadataKey = scopedMetadataKey;
        this.valueSizeDelta = valueSizeDelta;
        this.value = value;
    }

    /**
     * Creates an instance of EmbeddedAccountMetadataTransactionV1 from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of EmbeddedAccountMetadataTransactionV1 from binary payload
     */
    public static deserialize(payload: Uint8Array): EmbeddedAccountMetadataTransactionV1 {
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
        const targetAddress = UnresolvedAddress.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, targetAddress.size);
        const scopedMetadataKey = Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const valueSizeDelta = Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const valueSize = Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const value = Utils.getBytes(Uint8Array.from(byteArray), valueSize);
        byteArray.splice(0, valueSize);
        return new EmbeddedAccountMetadataTransactionV1({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            targetAddress: targetAddress,
            scopedMetadataKey: scopedMetadataKey,
            valueSizeDelta: valueSizeDelta,
            value: value,
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
        size += this.targetAddress.size; // targetAddress;
        size += 8; // scopedMetadataKey;
        size += 2; // valueSizeDelta;
        size += 2; // valueSize;
        size += this.value.length; // value;
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
        const targetAddressBytes = this.targetAddress.serialize();
        newArray = Utils.concatTypedArrays(newArray, targetAddressBytes);
        const scopedMetadataKeyBytes = Utils.bigIntToBuffer(this.scopedMetadataKey);
        newArray = Utils.concatTypedArrays(newArray, scopedMetadataKeyBytes);
        const valueSizeDeltaBytes = Utils.uint16ToBuffer(this.valueSizeDelta);
        newArray = Utils.concatTypedArrays(newArray, valueSizeDeltaBytes);
        const valueSizeBytes = Utils.uint16ToBuffer(this.value.length);
        newArray = Utils.concatTypedArrays(newArray, valueSizeBytes);
        const valueBytes = this.value;
        newArray = Utils.concatTypedArrays(newArray, valueBytes);
        return newArray;
    }
}
