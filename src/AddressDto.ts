/**
 *** Copyright (c) 2016-2019, Jaguar0625, gimre, BloodyRookie, Tech Bureau, Corp.
 *** Copyright (c) 2020-present, Jaguar0625, gimre, BloodyRookie.
 *** All rights reserved.
 ***
 *** This file is part of Catapult.
 ***
 *** Catapult is free software: you can redistribute it and/or modify
 *** it under the terms of the GNU Lesser General Public License as published by
 *** the Free Software Foundation, either version 3 of the License, or
 *** (at your option) any later version.
 ***
 *** Catapult is distributed in the hope that it will be useful,
 *** but WITHOUT ANY WARRANTY; without even the implied warranty of
 *** MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *** GNU Lesser General Public License for more details.
 ***
 *** You should have received a copy of the GNU Lesser General Public License
 *** along with Catapult. If not, see <http://www.gnu.org/licenses/>.
 **/

import { GeneratorUtils } from './GeneratorUtils';
import { Serializer } from './Serializer';

/** An [address](/concepts/cryptography.html#address) identifies an account and is derived from its PublicKey.. */
export class AddressDto implements Serializer {
    /** An [address](/concepts/cryptography.html#address) identifies an account and is derived from its PublicKey.. */
    readonly address: Uint8Array;

    /**
     * Constructor.
     *
     * @param address An [address](/concepts/cryptography.html#address) identifies an account and is derived from its PublicKey..
     */
    constructor(address: Uint8Array) {
        this.address = address;
    }

    /**
     * Creates an instance of AddressDto from binary payload.
     *
     * @param payload Byte payload to use to serialize the object.
     * @return Instance of AddressDto.
     */
    public static loadFromBinary(payload: Uint8Array): AddressDto {
        const address = GeneratorUtils.getBytes(Uint8Array.from(payload), 24);
        return new AddressDto(address);
    }

    /**
     * Gets An [address](/concepts/cryptography.html#address) identifies an account and is derived from its PublicKey..
     *
     * @return An [address](/concepts/cryptography.html#address) identifies an account and is derived from its PublicKey..
     */
    public getAddress(): Uint8Array {
        return this.address;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        return 24;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        return this.getAddress();
    }
}
