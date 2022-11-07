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
import { AccountRestrictionsInfo } from './AccountRestrictionsInfo';
import { Address } from './Address';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of AccountRestrictions
 */
export interface AccountRestrictionsParams {
    /**
     * serialization version
     */
    version: number;
    /**
     * address on which restrictions are placed
     */
    address: Address;
    /**
     * account restrictions
     */
    restrictions: AccountRestrictionsInfo[];
}

/**
 * binary layout for account restrictions
 */
export class AccountRestrictions implements Serializer {
    /**
     * serialization version
     */
    public readonly version: number;
    /**
     * address on which restrictions are placed
     */
    public readonly address: Address;
    /**
     * account restrictions
     */
    public readonly restrictions: AccountRestrictionsInfo[];

    /**
     * Constructor
     * @param version - serialization version
     * @param address - address on which restrictions are placed
     * @param restrictions - account restrictions
     */
    constructor({ version, address, restrictions }: AccountRestrictionsParams) {
        this.version = version;
        this.address = address;
        this.restrictions = restrictions;
    }

    /**
     * Creates an instance of AccountRestrictions from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of AccountRestrictions from binary payload
     */
    public static deserialize(payload: Uint8Array): AccountRestrictions {
        const byteArray = Array.from(payload);
        const version = Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const address = Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, address.size);
        const restrictionsCount = Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const restrictions = Utils.deserialize(AccountRestrictionsInfo.deserialize, Uint8Array.from(byteArray), restrictionsCount);
        byteArray.splice(0, restrictions.reduce((sum, c) => sum + c.size, 0));
        return new AccountRestrictions({ version: version, address: address, restrictions: restrictions });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += 2; // version;
        size += this.address.size; // address;
        size += 8; // restrictionsCount;
        size += this.restrictions.reduce((sum, c) => sum + Utils.getSizeWithPadding(c.size, 0), 0); // restrictions;
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
        const addressBytes = this.address.serialize();
        newArray = Utils.concatTypedArrays(newArray, addressBytes);
        const restrictionsCountBytes = Utils.bigIntToBuffer(this.restrictions.length);
        newArray = Utils.concatTypedArrays(newArray, restrictionsCountBytes);
        const restrictionsBytes = Utils.writeList(this.restrictions, 0);
        newArray = Utils.concatTypedArrays(newArray, restrictionsBytes);
        return newArray;
    }
}
