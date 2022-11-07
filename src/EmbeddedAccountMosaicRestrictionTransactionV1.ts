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
import { AccountRestrictionFlags } from './AccountRestrictionFlags';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
import { UnresolvedMosaicId } from './UnresolvedMosaicId';
import { Utils } from './Utils';

/**
 * Interface to create instances of EmbeddedAccountMosaicRestrictionTransactionV1
 */
export interface EmbeddedAccountMosaicRestrictionTransactionV1Params {
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
     * Type of restriction being applied to the listed mosaics.
     */
    restrictionFlags: AccountRestrictionFlags[];
    /**
     * Array of mosaics being added to the restricted list.
     */
    restrictionAdditions: UnresolvedMosaicId[];
    /**
     * Array of mosaics being removed from the restricted list.
     */
    restrictionDeletions: UnresolvedMosaicId[];
}

/**
 * Embedded version of AccountMosaicRestrictionTransaction (V1, latest).
 */
export class EmbeddedAccountMosaicRestrictionTransactionV1 implements Serializer {
    /**
     * TRANSACTION_VERSION
     */
    public readonly TRANSACTION_VERSION = 1;
    /**
     * TRANSACTION_TYPE
     */
    public readonly TRANSACTION_TYPE = 16976;
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
     * Type of restriction being applied to the listed mosaics.
     */
    public readonly restrictionFlags: AccountRestrictionFlags[];
    /**
     * Array of mosaics being added to the restricted list.
     */
    public readonly restrictionAdditions: UnresolvedMosaicId[];
    /**
     * Array of mosaics being removed from the restricted list.
     */
    public readonly restrictionDeletions: UnresolvedMosaicId[];

    /**
     * Constructor
     * @param signerPublicKey - Public key of the signer of the entity.
     * @param version - Version of this structure.
     * @param network - Network on which this entity was created.
     * @param type - transaction type
     * @param restrictionFlags - Type of restriction being applied to the listed mosaics.
     * @param restrictionAdditions - Array of mosaics being added to the restricted list.
     * @param restrictionDeletions - Array of mosaics being removed from the restricted list.
     */
    constructor({
        signerPublicKey,
        version,
        network,
        type,
        restrictionFlags,
        restrictionAdditions,
        restrictionDeletions,
    }: EmbeddedAccountMosaicRestrictionTransactionV1Params) {
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.restrictionFlags = restrictionFlags;
        this.restrictionAdditions = restrictionAdditions;
        this.restrictionDeletions = restrictionDeletions;
    }

    /**
     * Creates an instance of EmbeddedAccountMosaicRestrictionTransactionV1 from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of EmbeddedAccountMosaicRestrictionTransactionV1 from binary payload
     */
    public static deserialize(payload: Uint8Array): EmbeddedAccountMosaicRestrictionTransactionV1 {
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
        const restrictionFlags = Utils.toFlags(AccountRestrictionFlags, Utils.bufferToUint16(Uint8Array.from(byteArray)));
        byteArray.splice(0, 2);
        const restrictionAdditionsCount = Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const restrictionDeletionsCount = Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const restrictionAdditions = Utils.deserialize(UnresolvedMosaicId.deserialize, Uint8Array.from(byteArray), restrictionAdditionsCount);
        byteArray.splice(0, restrictionAdditions.reduce((sum, c) => sum + c.size, 0));
        const restrictionDeletions = Utils.deserialize(UnresolvedMosaicId.deserialize, Uint8Array.from(byteArray), restrictionDeletionsCount);
        byteArray.splice(0, restrictionDeletions.reduce((sum, c) => sum + c.size, 0));
        return new EmbeddedAccountMosaicRestrictionTransactionV1({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            restrictionFlags: restrictionFlags,
            restrictionAdditions: restrictionAdditions,
            restrictionDeletions: restrictionDeletions,
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
        size += 2; // restrictionFlags;
        size += 1; // restrictionAdditionsCount;
        size += 1; // restrictionDeletionsCount;
        size += 4; // accountRestrictionTransactionBodyReserved_1;
        size += this.restrictionAdditions.reduce((sum, c) => sum + Utils.getSizeWithPadding(c.size, 0), 0); // restrictionAdditions;
        size += this.restrictionDeletions.reduce((sum, c) => sum + Utils.getSizeWithPadding(c.size, 0), 0); // restrictionDeletions;
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
        const restrictionFlagsBytes = Utils.uint16ToBuffer(Utils.fromFlags(AccountRestrictionFlags, this.restrictionFlags));
        newArray = Utils.concatTypedArrays(newArray, restrictionFlagsBytes);
        const restrictionAdditionsCountBytes = Utils.uint8ToBuffer(this.restrictionAdditions.length);
        newArray = Utils.concatTypedArrays(newArray, restrictionAdditionsCountBytes);
        const restrictionDeletionsCountBytes = Utils.uint8ToBuffer(this.restrictionDeletions.length);
        newArray = Utils.concatTypedArrays(newArray, restrictionDeletionsCountBytes);
        const accountRestrictionTransactionBodyReserved_1Bytes = Utils.uint32ToBuffer(0);
        newArray = Utils.concatTypedArrays(newArray, accountRestrictionTransactionBodyReserved_1Bytes);
        const restrictionAdditionsBytes = Utils.writeList(this.restrictionAdditions, 0);
        newArray = Utils.concatTypedArrays(newArray, restrictionAdditionsBytes);
        const restrictionDeletionsBytes = Utils.writeList(this.restrictionDeletions, 0);
        newArray = Utils.concatTypedArrays(newArray, restrictionDeletionsBytes);
        return newArray;
    }
}
