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
import { UnresolvedMosaic } from './UnresolvedMosaic';
import { Utils } from './Utils';

/**
 * Interface to create instances of EmbeddedMosaicSupplyRevocationTransactionV1
 */
export interface EmbeddedMosaicSupplyRevocationTransactionV1Params {
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
     * Address from which tokens should be revoked.
     */
    sourceAddress: UnresolvedAddress;
    /**
     * Revoked mosaic and amount.
     */
    mosaic: UnresolvedMosaic;
}

/**
 * Embedded version of MosaicSupplyRevocationTransaction (V1, latest).
 */
export class EmbeddedMosaicSupplyRevocationTransactionV1 implements Serializer {
    /**
     * TRANSACTION_VERSION
     */
    public readonly TRANSACTION_VERSION = 1;
    /**
     * TRANSACTION_TYPE
     */
    public readonly TRANSACTION_TYPE = 17229;
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
     * Address from which tokens should be revoked.
     */
    public readonly sourceAddress: UnresolvedAddress;
    /**
     * Revoked mosaic and amount.
     */
    public readonly mosaic: UnresolvedMosaic;

    /**
     * Constructor
     * @param signerPublicKey - Public key of the signer of the entity.
     * @param version - Version of this structure.
     * @param network - Network on which this entity was created.
     * @param type - transaction type
     * @param sourceAddress - Address from which tokens should be revoked.
     * @param mosaic - Revoked mosaic and amount.
     */
    constructor({ signerPublicKey, version, network, type, sourceAddress, mosaic }: EmbeddedMosaicSupplyRevocationTransactionV1Params) {
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.sourceAddress = sourceAddress;
        this.mosaic = mosaic;
    }

    /**
     * Creates an instance of EmbeddedMosaicSupplyRevocationTransactionV1 from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of EmbeddedMosaicSupplyRevocationTransactionV1 from binary payload
     */
    public static deserialize(payload: Uint8Array): EmbeddedMosaicSupplyRevocationTransactionV1 {
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
        const sourceAddress = UnresolvedAddress.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, sourceAddress.size);
        const mosaic = UnresolvedMosaic.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.size);
        return new EmbeddedMosaicSupplyRevocationTransactionV1({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            sourceAddress: sourceAddress,
            mosaic: mosaic,
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
        size += this.sourceAddress.size; // sourceAddress;
        size += this.mosaic.size; // mosaic;
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
        const sourceAddressBytes = this.sourceAddress.serialize();
        newArray = Utils.concatTypedArrays(newArray, sourceAddressBytes);
        const mosaicBytes = this.mosaic.serialize();
        newArray = Utils.concatTypedArrays(newArray, mosaicBytes);
        return newArray;
    }
}
