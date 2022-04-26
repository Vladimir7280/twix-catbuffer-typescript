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

import { AccountMetadataTransactionBodyBuilder } from './AccountMetadataTransactionBodyBuilder';
import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { GeneratorUtils } from './GeneratorUtils';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';

/**
 * Embedded version of AccountMetadataTransaction.
 **/
export class EmbeddedAccountMetadataTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    /** Account metadata transaction body. **/
    readonly accountMetadataTransactionBody: AccountMetadataTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param targetAddress Account whose metadata should be modified..
     * @param scopedMetadataKey Metadata key scoped to source, target and type..
     * @param valueSizeDelta Change in value size in bytes, compared to previous size..
     * @param value Difference between existing value and new value. \note When there is no existing value, this array is directly used and `value_size_delta`==`value_size`. \note When there is an existing value, the new value is the byte-wise XOR of the previous value and this array..
     */
    public constructor(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        targetAddress: UnresolvedAddressDto,
        scopedMetadataKey: number[],
        valueSizeDelta: number,
        value: Uint8Array,
    ) {
        super(signerPublicKey, version, network, type);
        this.accountMetadataTransactionBody = new AccountMetadataTransactionBodyBuilder(
            targetAddress,
            scopedMetadataKey,
            valueSizeDelta,
            value,
        );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedAccountMetadataTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const accountMetadataTransactionBody: AccountMetadataTransactionBodyBuilder = AccountMetadataTransactionBodyBuilder.loadFromBinary(
            Uint8Array.from(byteArray),
        );
        byteArray.splice(0, accountMetadataTransactionBody.getSize());
        return new EmbeddedAccountMetadataTransactionBuilder(
            superObject.signerPublicKey,
            superObject.version,
            superObject.network,
            superObject.type,
            accountMetadataTransactionBody.targetAddress,
            accountMetadataTransactionBody.scopedMetadataKey,
            accountMetadataTransactionBody.valueSizeDelta,
            accountMetadataTransactionBody.value,
        );
    }

    /**
     * Creates an instance of EmbeddedAccountMetadataTransactionBuilder.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param targetAddress Account whose metadata should be modified..
     * @param scopedMetadataKey Metadata key scoped to source, target and type..
     * @param valueSizeDelta Change in value size in bytes, compared to previous size..
     * @param value Difference between existing value and new value. \note When there is no existing value, this array is directly used and `value_size_delta`==`value_size`. \note When there is an existing value, the new value is the byte-wise XOR of the previous value and this array..
     * @return Instance of EmbeddedAccountMetadataTransactionBuilder.
     */
    public static createEmbeddedAccountMetadataTransactionBuilder(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        targetAddress: UnresolvedAddressDto,
        scopedMetadataKey: number[],
        valueSizeDelta: number,
        value: Uint8Array,
    ): EmbeddedAccountMetadataTransactionBuilder {
        return new EmbeddedAccountMetadataTransactionBuilder(
            signerPublicKey,
            version,
            network,
            type,
            targetAddress,
            scopedMetadataKey,
            valueSizeDelta,
            value,
        );
    }

    /**
     * Gets Account whose metadata should be modified..
     *
     * @return Account whose metadata should be modified..
     */
    public getTargetAddress(): UnresolvedAddressDto {
        return this.accountMetadataTransactionBody.getTargetAddress();
    }

    /**
     * Gets Metadata key scoped to source, target and type..
     *
     * @return Metadata key scoped to source, target and type..
     */
    public getScopedMetadataKey(): number[] {
        return this.accountMetadataTransactionBody.getScopedMetadataKey();
    }

    /**
     * Gets Change in value size in bytes, compared to previous size..
     *
     * @return Change in value size in bytes, compared to previous size..
     */
    public getValueSizeDelta(): number {
        return this.accountMetadataTransactionBody.getValueSizeDelta();
    }

    /**
     * Gets Difference between existing value and new value. \note When there is no existing value, this array is directly used and `value_size_delta`==`value_size`. \note When there is an existing value, the new value is the byte-wise XOR of the previous value and this array..
     *
     * @return Difference between existing value and new value. \note When there is no existing value, this array is directly used and `value_size_delta`==`value_size`. \note When there is an existing value, the new value is the byte-wise XOR of the previous value and this array..
     */
    public getValue(): Uint8Array {
        return this.accountMetadataTransactionBody.getValue();
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.accountMetadataTransactionBody.getSize(); // accountMetadataTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public getBody(): AccountMetadataTransactionBodyBuilder {
        return this.accountMetadataTransactionBody;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const accountMetadataTransactionBodyBytes = this.accountMetadataTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, accountMetadataTransactionBodyBytes);
        return newArray;
    }
}
