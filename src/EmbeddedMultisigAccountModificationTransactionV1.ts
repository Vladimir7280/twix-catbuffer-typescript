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
 * Interface to create instances of EmbeddedMultisigAccountModificationTransactionV1
 */
export interface EmbeddedMultisigAccountModificationTransactionV1Params {
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
     * Relative change to the **minimum** number of cosignatures required when **removing a cosignatory**.
E.g., when moving from 0 to 2 cosignatures this number would be **2**. When moving from 4 to 3 cosignatures, the number would be
     * **-1**.
     */
    minRemovalDelta: number;
    /**
     * Relative change to the **minimum** number of cosignatures required when **approving a transaction**.
E.g., when moving from 0 to 2 cosignatures this number would be **2**. When moving from 4 to 3 cosignatures, the number would be
     * **-1**.
     */
    minApprovalDelta: number;
    /**
     * Cosignatory address additions.
All accounts in this list will be able to cosign transactions on behalf of the multisig account. The number of required cosignatures depends on the configured minimum approval and minimum removal
     * values.
     */
    addressAdditions: UnresolvedAddress[];
    /**
     * Cosignatory address deletions.
All accounts in this list will stop being able to cosign transactions on behalf of the multisig account. A transaction containing **any** address in this array requires a number of cosignatures at least equal to the minimum removal
     * value.
     */
    addressDeletions: UnresolvedAddress[];
}

/**
 * Embedded version of MultisigAccountModificationTransaction (V1, latest).
 */
export class EmbeddedMultisigAccountModificationTransactionV1 implements Serializer {
    /**
     * TRANSACTION_VERSION
     */
    public readonly TRANSACTION_VERSION = 1;
    /**
     * TRANSACTION_TYPE
     */
    public readonly TRANSACTION_TYPE = 16725;
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
     * Relative change to the **minimum** number of cosignatures required when **removing a cosignatory**.
E.g., when moving from 0 to 2 cosignatures this number would be **2**. When moving from 4 to 3 cosignatures, the number would be
     * **-1**.
     */
    public readonly minRemovalDelta: number;
    /**
     * Relative change to the **minimum** number of cosignatures required when **approving a transaction**.
E.g., when moving from 0 to 2 cosignatures this number would be **2**. When moving from 4 to 3 cosignatures, the number would be
     * **-1**.
     */
    public readonly minApprovalDelta: number;
    /**
     * Cosignatory address additions.
All accounts in this list will be able to cosign transactions on behalf of the multisig account. The number of required cosignatures depends on the configured minimum approval and minimum removal
     * values.
     */
    public readonly addressAdditions: UnresolvedAddress[];
    /**
     * Cosignatory address deletions.
All accounts in this list will stop being able to cosign transactions on behalf of the multisig account. A transaction containing **any** address in this array requires a number of cosignatures at least equal to the minimum removal
     * value.
     */
    public readonly addressDeletions: UnresolvedAddress[];

    /**
     * Constructor
     * @param signerPublicKey - Public key of the signer of the entity.
     * @param version - Version of this structure.
     * @param network - Network on which this entity was created.
     * @param type - transaction type
     * @param minRemovalDelta - Relative change to the **minimum** number of cosignatures required when **removing a cosignatory**.
E.g., when moving from 0 to 2 cosignatures this number would be **2**. When moving from 4 to 3 cosignatures, the number would be
     * **-1**.
     * @param minApprovalDelta - Relative change to the **minimum** number of cosignatures required when **approving a transaction**.
E.g., when moving from 0 to 2 cosignatures this number would be **2**. When moving from 4 to 3 cosignatures, the number would be
     * **-1**.
     * @param addressAdditions - Cosignatory address additions.
All accounts in this list will be able to cosign transactions on behalf of the multisig account. The number of required cosignatures depends on the configured minimum approval and minimum removal
     * values.
     * @param addressDeletions - Cosignatory address deletions.
All accounts in this list will stop being able to cosign transactions on behalf of the multisig account. A transaction containing **any** address in this array requires a number of cosignatures at least equal to the minimum removal
     * value.
     */
    constructor({
        signerPublicKey,
        version,
        network,
        type,
        minRemovalDelta,
        minApprovalDelta,
        addressAdditions,
        addressDeletions,
    }: EmbeddedMultisigAccountModificationTransactionV1Params) {
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.minRemovalDelta = minRemovalDelta;
        this.minApprovalDelta = minApprovalDelta;
        this.addressAdditions = addressAdditions;
        this.addressDeletions = addressDeletions;
    }

    /**
     * Creates an instance of EmbeddedMultisigAccountModificationTransactionV1 from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of EmbeddedMultisigAccountModificationTransactionV1 from binary payload
     */
    public static deserialize(payload: Uint8Array): EmbeddedMultisigAccountModificationTransactionV1 {
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
        const minRemovalDelta = Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const minApprovalDelta = Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const addressAdditionsCount = Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const addressDeletionsCount = Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const addressAdditions = Utils.deserialize(UnresolvedAddress.deserialize, Uint8Array.from(byteArray), addressAdditionsCount);
        byteArray.splice(0, addressAdditions.reduce((sum, c) => sum + c.size, 0));
        const addressDeletions = Utils.deserialize(UnresolvedAddress.deserialize, Uint8Array.from(byteArray), addressDeletionsCount);
        byteArray.splice(0, addressDeletions.reduce((sum, c) => sum + c.size, 0));
        return new EmbeddedMultisigAccountModificationTransactionV1({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            minRemovalDelta: minRemovalDelta,
            minApprovalDelta: minApprovalDelta,
            addressAdditions: addressAdditions,
            addressDeletions: addressDeletions,
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
        size += 1; // minRemovalDelta;
        size += 1; // minApprovalDelta;
        size += 1; // addressAdditionsCount;
        size += 1; // addressDeletionsCount;
        size += 4; // multisigAccountModificationTransactionBodyReserved_1;
        size += this.addressAdditions.reduce((sum, c) => sum + Utils.getSizeWithPadding(c.size, 0), 0); // addressAdditions;
        size += this.addressDeletions.reduce((sum, c) => sum + Utils.getSizeWithPadding(c.size, 0), 0); // addressDeletions;
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
        const minRemovalDeltaBytes = Utils.uint8ToBuffer(this.minRemovalDelta);
        newArray = Utils.concatTypedArrays(newArray, minRemovalDeltaBytes);
        const minApprovalDeltaBytes = Utils.uint8ToBuffer(this.minApprovalDelta);
        newArray = Utils.concatTypedArrays(newArray, minApprovalDeltaBytes);
        const addressAdditionsCountBytes = Utils.uint8ToBuffer(this.addressAdditions.length);
        newArray = Utils.concatTypedArrays(newArray, addressAdditionsCountBytes);
        const addressDeletionsCountBytes = Utils.uint8ToBuffer(this.addressDeletions.length);
        newArray = Utils.concatTypedArrays(newArray, addressDeletionsCountBytes);
        const multisigAccountModificationTransactionBodyReserved_1Bytes = Utils.uint32ToBuffer(0);
        newArray = Utils.concatTypedArrays(newArray, multisigAccountModificationTransactionBodyReserved_1Bytes);
        const addressAdditionsBytes = Utils.writeList(this.addressAdditions, 0);
        newArray = Utils.concatTypedArrays(newArray, addressAdditionsBytes);
        const addressDeletionsBytes = Utils.writeList(this.addressDeletions, 0);
        newArray = Utils.concatTypedArrays(newArray, addressDeletionsBytes);
        return newArray;
    }
}
