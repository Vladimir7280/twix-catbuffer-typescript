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
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of MultisigEntry
 */
export interface MultisigEntryParams {
    /**
     * serialization version
     */
    version: number;
    /**
     * minimum approval for modifications
     */
    minApproval: number;
    /**
     * minimum approval for removal
     */
    minRemoval: number;
    /**
     * account address
     */
    accountAddress: Address;
    /**
     * cosignatories for account
     */
    cosignatoryAddresses: Address[];
    /**
     * accounts for which the entry is cosignatory
     */
    multisigAddresses: Address[];
}

/**
 * binary layout for a multisig entry
 */
export class MultisigEntry implements Serializer {
    /**
     * serialization version
     */
    public readonly version: number;
    /**
     * minimum approval for modifications
     */
    public readonly minApproval: number;
    /**
     * minimum approval for removal
     */
    public readonly minRemoval: number;
    /**
     * account address
     */
    public readonly accountAddress: Address;
    /**
     * cosignatories for account
     */
    public readonly cosignatoryAddresses: Address[];
    /**
     * accounts for which the entry is cosignatory
     */
    public readonly multisigAddresses: Address[];

    /**
     * Constructor
     * @param version - serialization version
     * @param minApproval - minimum approval for modifications
     * @param minRemoval - minimum approval for removal
     * @param accountAddress - account address
     * @param cosignatoryAddresses - cosignatories for account
     * @param multisigAddresses - accounts for which the entry is cosignatory
     */
    constructor({ version, minApproval, minRemoval, accountAddress, cosignatoryAddresses, multisigAddresses }: MultisigEntryParams) {
        this.version = version;
        this.minApproval = minApproval;
        this.minRemoval = minRemoval;
        this.accountAddress = accountAddress;
        this.cosignatoryAddresses = cosignatoryAddresses;
        this.multisigAddresses = multisigAddresses;
    }

    /**
     * Creates an instance of MultisigEntry from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of MultisigEntry from binary payload
     */
    public static deserialize(payload: Uint8Array): MultisigEntry {
        const byteArray = Array.from(payload);
        const version = Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const minApproval = Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const minRemoval = Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const accountAddress = Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, accountAddress.size);
        const cosignatoryAddressesCount = Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const cosignatoryAddresses = Utils.deserialize(Address.deserialize, Uint8Array.from(byteArray), cosignatoryAddressesCount);
        byteArray.splice(0, cosignatoryAddresses.reduce((sum, c) => sum + c.size, 0));
        const multisigAddressesCount = Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const multisigAddresses = Utils.deserialize(Address.deserialize, Uint8Array.from(byteArray), multisigAddressesCount);
        byteArray.splice(0, multisigAddresses.reduce((sum, c) => sum + c.size, 0));
        return new MultisigEntry({
            version: version,
            minApproval: minApproval,
            minRemoval: minRemoval,
            accountAddress: accountAddress,
            cosignatoryAddresses: cosignatoryAddresses,
            multisigAddresses: multisigAddresses,
        });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += 2; // version;
        size += 4; // minApproval;
        size += 4; // minRemoval;
        size += this.accountAddress.size; // accountAddress;
        size += 8; // cosignatoryAddressesCount;
        size += this.cosignatoryAddresses.reduce((sum, c) => sum + Utils.getSizeWithPadding(c.size, 0), 0); // cosignatoryAddresses;
        size += 8; // multisigAddressesCount;
        size += this.multisigAddresses.reduce((sum, c) => sum + Utils.getSizeWithPadding(c.size, 0), 0); // multisigAddresses;
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
        const minApprovalBytes = Utils.uint32ToBuffer(this.minApproval);
        newArray = Utils.concatTypedArrays(newArray, minApprovalBytes);
        const minRemovalBytes = Utils.uint32ToBuffer(this.minRemoval);
        newArray = Utils.concatTypedArrays(newArray, minRemovalBytes);
        const accountAddressBytes = this.accountAddress.serialize();
        newArray = Utils.concatTypedArrays(newArray, accountAddressBytes);
        const cosignatoryAddressesCountBytes = Utils.bigIntToBuffer(this.cosignatoryAddresses.length);
        newArray = Utils.concatTypedArrays(newArray, cosignatoryAddressesCountBytes);
        const cosignatoryAddressesBytes = Utils.writeList(this.cosignatoryAddresses, 0);
        newArray = Utils.concatTypedArrays(newArray, cosignatoryAddressesBytes);
        const multisigAddressesCountBytes = Utils.bigIntToBuffer(this.multisigAddresses.length);
        newArray = Utils.concatTypedArrays(newArray, multisigAddressesCountBytes);
        const multisigAddressesBytes = Utils.writeList(this.multisigAddresses, 0);
        newArray = Utils.concatTypedArrays(newArray, multisigAddressesBytes);
        return newArray;
    }
}
