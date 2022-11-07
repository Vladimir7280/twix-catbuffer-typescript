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
import { MosaicFlags } from './MosaicFlags';
import { MosaicId } from './MosaicId';
import { MosaicNonce } from './MosaicNonce';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
import { Utils } from './Utils';

/**
 * Interface to create instances of EmbeddedMosaicDefinitionTransactionV1
 */
export interface EmbeddedMosaicDefinitionTransactionV1Params {
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
     * Unique mosaic identifier obtained from the generator account's public key and the `nonce`.
The SDK's can take care of generating this ID for
     * you.
     */
    id: MosaicId;
    /**
     * Mosaic duration expressed in blocks. If set to 0, the mosaic never expires.
     */
    duration: BlockDuration;
    /**
     * Random nonce used to generate the mosaic id.
     */
    nonce: MosaicNonce;
    /**
     * Mosaic flags.
     */
    flags: MosaicFlags[];
    /**
     * Mosaic divisibility.
     */
    divisibility: number;
}

/**
 * Embedded version of MosaicDefinitionTransaction (V1, latest).
 */
export class EmbeddedMosaicDefinitionTransactionV1 implements Serializer {
    /**
     * TRANSACTION_VERSION
     */
    public readonly TRANSACTION_VERSION = 1;
    /**
     * TRANSACTION_TYPE
     */
    public readonly TRANSACTION_TYPE = 16717;
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
     * Unique mosaic identifier obtained from the generator account's public key and the `nonce`.
The SDK's can take care of generating this ID for
     * you.
     */
    public readonly id: MosaicId;
    /**
     * Mosaic duration expressed in blocks. If set to 0, the mosaic never expires.
     */
    public readonly duration: BlockDuration;
    /**
     * Random nonce used to generate the mosaic id.
     */
    public readonly nonce: MosaicNonce;
    /**
     * Mosaic flags.
     */
    public readonly flags: MosaicFlags[];
    /**
     * Mosaic divisibility.
     */
    public readonly divisibility: number;

    /**
     * Constructor
     * @param signerPublicKey - Public key of the signer of the entity.
     * @param version - Version of this structure.
     * @param network - Network on which this entity was created.
     * @param type - transaction type
     * @param id - Unique mosaic identifier obtained from the generator account's public key and the `nonce`.
The SDK's can take care of generating this ID for
     * you.
     * @param duration - Mosaic duration expressed in blocks. If set to 0, the mosaic never expires.
     * @param nonce - Random nonce used to generate the mosaic id.
     * @param flags - Mosaic flags.
     * @param divisibility - Mosaic divisibility.
     */
    constructor({
        signerPublicKey,
        version,
        network,
        type,
        id,
        duration,
        nonce,
        flags,
        divisibility,
    }: EmbeddedMosaicDefinitionTransactionV1Params) {
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.id = id;
        this.duration = duration;
        this.nonce = nonce;
        this.flags = flags;
        this.divisibility = divisibility;
    }

    /**
     * Creates an instance of EmbeddedMosaicDefinitionTransactionV1 from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of EmbeddedMosaicDefinitionTransactionV1 from binary payload
     */
    public static deserialize(payload: Uint8Array): EmbeddedMosaicDefinitionTransactionV1 {
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
        const id = MosaicId.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, id.size);
        const duration = BlockDuration.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, duration.size);
        const nonce = MosaicNonce.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, nonce.size);
        const flags = Utils.toFlags(MosaicFlags, Utils.bufferToUint8(Uint8Array.from(byteArray)));
        byteArray.splice(0, 1);
        const divisibility = Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new EmbeddedMosaicDefinitionTransactionV1({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            id: id,
            duration: duration,
            nonce: nonce,
            flags: flags,
            divisibility: divisibility,
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
        size += this.id.size; // id;
        size += this.duration.size; // duration;
        size += this.nonce.size; // nonce;
        size += 1; // flags;
        size += 1; // divisibility;
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
        const idBytes = this.id.serialize();
        newArray = Utils.concatTypedArrays(newArray, idBytes);
        const durationBytes = this.duration.serialize();
        newArray = Utils.concatTypedArrays(newArray, durationBytes);
        const nonceBytes = this.nonce.serialize();
        newArray = Utils.concatTypedArrays(newArray, nonceBytes);
        const flagsBytes = Utils.uint8ToBuffer(Utils.fromFlags(MosaicFlags, this.flags));
        newArray = Utils.concatTypedArrays(newArray, flagsBytes);
        const divisibilityBytes = Utils.uint8ToBuffer(this.divisibility);
        newArray = Utils.concatTypedArrays(newArray, divisibilityBytes);
        return newArray;
    }
}
