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
import { Hash256 } from './Hash256';
import { Height } from './Height';
import { LockHashAlgorithm } from './LockHashAlgorithm';
import { LockStatus } from './LockStatus';
import { Mosaic } from './Mosaic';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of SecretLockInfo
 */
export interface SecretLockInfoParams {
    /**
     * serialization version
     */
    version: number;
    /**
     * owner address
     */
    ownerAddress: Address;
    /**
     * mosaic associated with lock
     */
    mosaic: Mosaic;
    /**
     * height at which the lock expires
     */
    endHeight: Height;
    /**
     * flag indicating whether or not the lock was already used
     */
    status: LockStatus;
    /**
     * hash algorithm
     */
    hashAlgorithm: LockHashAlgorithm;
    /**
     * transaction secret
     */
    secret: Hash256;
    /**
     * transaction recipient
     */
    recipient: Address;
}

/**
 * binary layout for serialized lock transaction
 */
export class SecretLockInfo implements Serializer {
    /**
     * serialization version
     */
    public readonly version: number;
    /**
     * owner address
     */
    public readonly ownerAddress: Address;
    /**
     * mosaic associated with lock
     */
    public readonly mosaic: Mosaic;
    /**
     * height at which the lock expires
     */
    public readonly endHeight: Height;
    /**
     * flag indicating whether or not the lock was already used
     */
    public readonly status: LockStatus;
    /**
     * hash algorithm
     */
    public readonly hashAlgorithm: LockHashAlgorithm;
    /**
     * transaction secret
     */
    public readonly secret: Hash256;
    /**
     * transaction recipient
     */
    public readonly recipient: Address;

    /**
     * Constructor
     * @param version - serialization version
     * @param ownerAddress - owner address
     * @param mosaic - mosaic associated with lock
     * @param endHeight - height at which the lock expires
     * @param status - flag indicating whether or not the lock was already used
     * @param hashAlgorithm - hash algorithm
     * @param secret - transaction secret
     * @param recipient - transaction recipient
     */
    constructor({ version, ownerAddress, mosaic, endHeight, status, hashAlgorithm, secret, recipient }: SecretLockInfoParams) {
        this.version = version;
        this.ownerAddress = ownerAddress;
        this.mosaic = mosaic;
        this.endHeight = endHeight;
        this.status = status;
        this.hashAlgorithm = hashAlgorithm;
        this.secret = secret;
        this.recipient = recipient;
    }

    /**
     * Creates an instance of SecretLockInfo from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of SecretLockInfo from binary payload
     */
    public static deserialize(payload: Uint8Array): SecretLockInfo {
        const byteArray = Array.from(payload);
        const version = Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const ownerAddress = Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, ownerAddress.size);
        const mosaic = Mosaic.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.size);
        const endHeight = Height.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, endHeight.size);
        const status = Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const hashAlgorithm = Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const secret = Hash256.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, secret.size);
        const recipient = Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, recipient.size);
        return new SecretLockInfo({
            version: version,
            ownerAddress: ownerAddress,
            mosaic: mosaic,
            endHeight: endHeight,
            status: status,
            hashAlgorithm: hashAlgorithm,
            secret: secret,
            recipient: recipient,
        });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += 2; // version;
        size += this.ownerAddress.size; // ownerAddress;
        size += this.mosaic.size; // mosaic;
        size += this.endHeight.size; // endHeight;
        size += 1; // status;
        size += 1; // hashAlgorithm;
        size += this.secret.size; // secret;
        size += this.recipient.size; // recipient;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const versionBytes = Utils.uint16ToBuffer(this.version);
        newArray = Utils.concatTypedArrays(newArray, versionBytes);
        const ownerAddressBytes = this.ownerAddress.serialize();
        newArray = Utils.concatTypedArrays(newArray, ownerAddressBytes);
        const mosaicBytes = this.mosaic.serialize();
        newArray = Utils.concatTypedArrays(newArray, mosaicBytes);
        const endHeightBytes = this.endHeight.serialize();
        newArray = Utils.concatTypedArrays(newArray, endHeightBytes);
        const statusBytes = Utils.uint8ToBuffer(this.status);
        newArray = Utils.concatTypedArrays(newArray, statusBytes);
        const hashAlgorithmBytes = Utils.uint8ToBuffer(this.hashAlgorithm);
        newArray = Utils.concatTypedArrays(newArray, hashAlgorithmBytes);
        const secretBytes = this.secret.serialize();
        newArray = Utils.concatTypedArrays(newArray, secretBytes);
        const recipientBytes = this.recipient.serialize();
        newArray = Utils.concatTypedArrays(newArray, recipientBytes);
        return newArray;
    }
}
