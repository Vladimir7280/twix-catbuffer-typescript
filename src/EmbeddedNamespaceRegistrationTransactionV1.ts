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
import { BlockDuration } from './BlockDuration';
import { NamespaceId } from './NamespaceId';
import { NamespaceRegistrationType } from './NamespaceRegistrationType';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
import { Utils } from './Utils';

/**
 * Interface to create instances of EmbeddedNamespaceRegistrationTransactionV1
 */
export interface EmbeddedNamespaceRegistrationTransactionV1Params {
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
     * Number of confirmed blocks you would like to rent the namespace for. Required for root namespaces.
     */
    duration?: BlockDuration;
    /**
     * Parent namespace identifier. Required for sub-namespaces.
     */
    parentId?: NamespaceId;
    /**
     * Namespace identifier.
     */
    id: NamespaceId;
    /**
     * Namespace registration type.
     */
    registrationType: NamespaceRegistrationType;
    /**
     * Namespace name.
     */
    name: Uint8Array;
}

/**
 * Embedded version of NamespaceRegistrationTransaction (V1, latest).
 */
export class EmbeddedNamespaceRegistrationTransactionV1 implements Serializer {
    /**
     * TRANSACTION_VERSION
     */
    public readonly TRANSACTION_VERSION = 1;
    /**
     * TRANSACTION_TYPE
     */
    public readonly TRANSACTION_TYPE = 16718;
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
     * Number of confirmed blocks you would like to rent the namespace for. Required for root namespaces.
     */
    public readonly duration?: BlockDuration;
    /**
     * Parent namespace identifier. Required for sub-namespaces.
     */
    public readonly parentId?: NamespaceId;
    /**
     * Namespace identifier.
     */
    public readonly id: NamespaceId;
    /**
     * Namespace registration type.
     */
    public readonly registrationType: NamespaceRegistrationType;
    /**
     * Namespace name.
     */
    public readonly name: Uint8Array;

    /**
     * Constructor
     * @param signerPublicKey - Public key of the signer of the entity.
     * @param version - Version of this structure.
     * @param network - Network on which this entity was created.
     * @param type - transaction type
     * @param duration - Number of confirmed blocks you would like to rent the namespace for. Required for root namespaces.
     * @param parentId - Parent namespace identifier. Required for sub-namespaces.
     * @param id - Namespace identifier.
     * @param registrationType - Namespace registration type.
     * @param name - Namespace name.
     */
    constructor({
        signerPublicKey,
        version,
        network,
        type,
        duration,
        parentId,
        id,
        registrationType,
        name,
    }: EmbeddedNamespaceRegistrationTransactionV1Params) {
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.duration = duration;
        this.parentId = parentId;
        this.id = id;
        this.registrationType = registrationType;
        this.name = name;
    }

    /**
     * Creates an instance of EmbeddedNamespaceRegistrationTransactionV1 from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of EmbeddedNamespaceRegistrationTransactionV1 from binary payload
     */
    public static deserialize(payload: Uint8Array): EmbeddedNamespaceRegistrationTransactionV1 {
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
        const registrationTypeBytes = Utils.getBytes(Uint8Array.from(byteArray), 8);
        byteArray.splice(0, 8);
        const id = NamespaceId.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, id.size);
        const registrationType = Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const nameSize = Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const name = Utils.getBytes(Uint8Array.from(byteArray), nameSize);
        byteArray.splice(0, nameSize);
        let duration: BlockDuration | undefined;
        if (registrationType === NamespaceRegistrationType.ROOT) {
            duration = BlockDuration.deserialize(registrationTypeBytes);
        }
        let parentId: NamespaceId | undefined;
        if (registrationType === NamespaceRegistrationType.CHILD) {
            parentId = NamespaceId.deserialize(registrationTypeBytes);
        }
        return new EmbeddedNamespaceRegistrationTransactionV1({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            duration: duration,
            parentId: parentId,
            id: id,
            registrationType: registrationType,
            name: name,
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
        if (this.registrationType === NamespaceRegistrationType.ROOT) {
            size += this.duration!.size; // duration;
        }
        if (this.registrationType === NamespaceRegistrationType.CHILD) {
            size += this.parentId!.size; // parentId;
        }
        size += this.id.size; // id;
        size += 1; // registrationType;
        size += 1; // nameSize;
        size += this.name.length; // name;
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
        if (this.registrationType === NamespaceRegistrationType.ROOT) {
            const durationBytes = this.duration!.serialize();
            newArray = Utils.concatTypedArrays(newArray, durationBytes);
        }
        if (this.registrationType === NamespaceRegistrationType.CHILD) {
            const parentIdBytes = this.parentId!.serialize();
            newArray = Utils.concatTypedArrays(newArray, parentIdBytes);
        }
        const idBytes = this.id.serialize();
        newArray = Utils.concatTypedArrays(newArray, idBytes);
        const registrationTypeBytes = Utils.uint8ToBuffer(this.registrationType);
        newArray = Utils.concatTypedArrays(newArray, registrationTypeBytes);
        const nameSizeBytes = Utils.uint8ToBuffer(this.name.length);
        newArray = Utils.concatTypedArrays(newArray, nameSizeBytes);
        const nameBytes = this.name;
        newArray = Utils.concatTypedArrays(newArray, nameBytes);
        return newArray;
    }
}
