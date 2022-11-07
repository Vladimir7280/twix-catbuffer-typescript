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
import { UnresolvedMosaicId } from './UnresolvedMosaicId';
import { Utils } from './Utils';

/**
 * Interface to create instances of EmbeddedMosaicAddressRestrictionTransactionV1
 */
export interface EmbeddedMosaicAddressRestrictionTransactionV1Params {
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
     * Identifier of the mosaic to which the restriction applies.
     */
    mosaicId: UnresolvedMosaicId;
    /**
     * Restriction key.
     */
    restrictionKey: bigint;
    /**
     * Previous restriction value. Set `previousRestrictionValue` to `FFFFFFFFFFFFFFFF` if the target address does not have a previous restriction value for this mosaic id and restriction
     * key.
     */
    previousRestrictionValue: bigint;
    /**
     * New restriction value.
     */
    newRestrictionValue: bigint;
    /**
     * Address being restricted.
     */
    targetAddress: UnresolvedAddress;
}

/**
 * Embedded version of MosaicAddressRestrictionTransaction (V1, latest).
 */
export class EmbeddedMosaicAddressRestrictionTransactionV1 implements Serializer {
    /**
     * TRANSACTION_VERSION
     */
    public readonly TRANSACTION_VERSION = 1;
    /**
     * TRANSACTION_TYPE
     */
    public readonly TRANSACTION_TYPE = 16977;
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
     * Identifier of the mosaic to which the restriction applies.
     */
    public readonly mosaicId: UnresolvedMosaicId;
    /**
     * Restriction key.
     */
    public readonly restrictionKey: bigint;
    /**
     * Previous restriction value. Set `previousRestrictionValue` to `FFFFFFFFFFFFFFFF` if the target address does not have a previous restriction value for this mosaic id and restriction
     * key.
     */
    public readonly previousRestrictionValue: bigint;
    /**
     * New restriction value.
     */
    public readonly newRestrictionValue: bigint;
    /**
     * Address being restricted.
     */
    public readonly targetAddress: UnresolvedAddress;

    /**
     * Constructor
     * @param signerPublicKey - Public key of the signer of the entity.
     * @param version - Version of this structure.
     * @param network - Network on which this entity was created.
     * @param type - transaction type
     * @param mosaicId - Identifier of the mosaic to which the restriction applies.
     * @param restrictionKey - Restriction key.
     * @param previousRestrictionValue - Previous restriction value. Set `previousRestrictionValue` to `FFFFFFFFFFFFFFFF` if the target address does not have a previous restriction value for this mosaic id and restriction
     * key.
     * @param newRestrictionValue - New restriction value.
     * @param targetAddress - Address being restricted.
     */
    constructor({
        signerPublicKey,
        version,
        network,
        type,
        mosaicId,
        restrictionKey,
        previousRestrictionValue,
        newRestrictionValue,
        targetAddress,
    }: EmbeddedMosaicAddressRestrictionTransactionV1Params) {
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.mosaicId = mosaicId;
        this.restrictionKey = restrictionKey;
        this.previousRestrictionValue = previousRestrictionValue;
        this.newRestrictionValue = newRestrictionValue;
        this.targetAddress = targetAddress;
    }

    /**
     * Creates an instance of EmbeddedMosaicAddressRestrictionTransactionV1 from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of EmbeddedMosaicAddressRestrictionTransactionV1 from binary payload
     */
    public static deserialize(payload: Uint8Array): EmbeddedMosaicAddressRestrictionTransactionV1 {
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
        const mosaicId = UnresolvedMosaicId.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.size);
        const restrictionKey = Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const previousRestrictionValue = Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const newRestrictionValue = Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const targetAddress = UnresolvedAddress.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, targetAddress.size);
        return new EmbeddedMosaicAddressRestrictionTransactionV1({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            mosaicId: mosaicId,
            restrictionKey: restrictionKey,
            previousRestrictionValue: previousRestrictionValue,
            newRestrictionValue: newRestrictionValue,
            targetAddress: targetAddress,
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
        size += this.mosaicId.size; // mosaicId;
        size += 8; // restrictionKey;
        size += 8; // previousRestrictionValue;
        size += 8; // newRestrictionValue;
        size += this.targetAddress.size; // targetAddress;
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
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = Utils.concatTypedArrays(newArray, mosaicIdBytes);
        const restrictionKeyBytes = Utils.bigIntToBuffer(this.restrictionKey);
        newArray = Utils.concatTypedArrays(newArray, restrictionKeyBytes);
        const previousRestrictionValueBytes = Utils.bigIntToBuffer(this.previousRestrictionValue);
        newArray = Utils.concatTypedArrays(newArray, previousRestrictionValueBytes);
        const newRestrictionValueBytes = Utils.bigIntToBuffer(this.newRestrictionValue);
        newArray = Utils.concatTypedArrays(newArray, newRestrictionValueBytes);
        const targetAddressBytes = this.targetAddress.serialize();
        newArray = Utils.concatTypedArrays(newArray, targetAddressBytes);
        return newArray;
    }
}
