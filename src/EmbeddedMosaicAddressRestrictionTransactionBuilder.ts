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

import { EmbeddedTransactionBuilder } from './EmbeddedTransactionBuilder';
import { GeneratorUtils } from './GeneratorUtils';
import { MosaicAddressRestrictionTransactionBodyBuilder } from './MosaicAddressRestrictionTransactionBodyBuilder';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedAddressDto } from './UnresolvedAddressDto';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';

/**
 * Embedded version of MosaicAddressRestrictionTransaction.
 **/
export class EmbeddedMosaicAddressRestrictionTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    /** Mosaic address restriction transaction body. **/
    readonly mosaicAddressRestrictionTransactionBody: MosaicAddressRestrictionTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param mosaicId Identifier of the mosaic to which the restriction applies..
     * @param restrictionKey Restriction key..
     * @param previousRestrictionValue Previous restriction value. Set `previousRestrictionValue` to `FFFFFFFFFFFFFFFF` if the target address does not have a previous restriction value for this mosaic id and restriction key..
     * @param newRestrictionValue New restriction value..
     * @param targetAddress Address being restricted..
     */
    public constructor(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        mosaicId: UnresolvedMosaicIdDto,
        restrictionKey: number[],
        previousRestrictionValue: number[],
        newRestrictionValue: number[],
        targetAddress: UnresolvedAddressDto,
    ) {
        super(signerPublicKey, version, network, type);
        this.mosaicAddressRestrictionTransactionBody = new MosaicAddressRestrictionTransactionBodyBuilder(
            mosaicId,
            restrictionKey,
            previousRestrictionValue,
            newRestrictionValue,
            targetAddress,
        );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedMosaicAddressRestrictionTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const mosaicAddressRestrictionTransactionBody: MosaicAddressRestrictionTransactionBodyBuilder =
            MosaicAddressRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicAddressRestrictionTransactionBody.getSize());
        return new EmbeddedMosaicAddressRestrictionTransactionBuilder(
            superObject.signerPublicKey,
            superObject.version,
            superObject.network,
            superObject.type,
            mosaicAddressRestrictionTransactionBody.mosaicId,
            mosaicAddressRestrictionTransactionBody.restrictionKey,
            mosaicAddressRestrictionTransactionBody.previousRestrictionValue,
            mosaicAddressRestrictionTransactionBody.newRestrictionValue,
            mosaicAddressRestrictionTransactionBody.targetAddress,
        );
    }

    /**
     * Creates an instance of EmbeddedMosaicAddressRestrictionTransactionBuilder.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param mosaicId Identifier of the mosaic to which the restriction applies..
     * @param restrictionKey Restriction key..
     * @param previousRestrictionValue Previous restriction value. Set `previousRestrictionValue` to `FFFFFFFFFFFFFFFF` if the target address does not have a previous restriction value for this mosaic id and restriction key..
     * @param newRestrictionValue New restriction value..
     * @param targetAddress Address being restricted..
     * @return Instance of EmbeddedMosaicAddressRestrictionTransactionBuilder.
     */
    public static createEmbeddedMosaicAddressRestrictionTransactionBuilder(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        mosaicId: UnresolvedMosaicIdDto,
        restrictionKey: number[],
        previousRestrictionValue: number[],
        newRestrictionValue: number[],
        targetAddress: UnresolvedAddressDto,
    ): EmbeddedMosaicAddressRestrictionTransactionBuilder {
        return new EmbeddedMosaicAddressRestrictionTransactionBuilder(
            signerPublicKey,
            version,
            network,
            type,
            mosaicId,
            restrictionKey,
            previousRestrictionValue,
            newRestrictionValue,
            targetAddress,
        );
    }

    /**
     * Gets Identifier of the mosaic to which the restriction applies..
     *
     * @return Identifier of the mosaic to which the restriction applies..
     */
    public getMosaicId(): UnresolvedMosaicIdDto {
        return this.mosaicAddressRestrictionTransactionBody.getMosaicId();
    }

    /**
     * Gets Restriction key..
     *
     * @return Restriction key..
     */
    public getRestrictionKey(): number[] {
        return this.mosaicAddressRestrictionTransactionBody.getRestrictionKey();
    }

    /**
     * Gets Previous restriction value. Set `previousRestrictionValue` to `FFFFFFFFFFFFFFFF` if the target address does not have a previous restriction value for this mosaic id and restriction key..
     *
     * @return Previous restriction value. Set `previousRestrictionValue` to `FFFFFFFFFFFFFFFF` if the target address does not have a previous restriction value for this mosaic id and restriction key..
     */
    public getPreviousRestrictionValue(): number[] {
        return this.mosaicAddressRestrictionTransactionBody.getPreviousRestrictionValue();
    }

    /**
     * Gets New restriction value..
     *
     * @return New restriction value..
     */
    public getNewRestrictionValue(): number[] {
        return this.mosaicAddressRestrictionTransactionBody.getNewRestrictionValue();
    }

    /**
     * Gets Address being restricted..
     *
     * @return Address being restricted..
     */
    public getTargetAddress(): UnresolvedAddressDto {
        return this.mosaicAddressRestrictionTransactionBody.getTargetAddress();
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.mosaicAddressRestrictionTransactionBody.getSize(); // mosaicAddressRestrictionTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public getBody(): MosaicAddressRestrictionTransactionBodyBuilder {
        return this.mosaicAddressRestrictionTransactionBody;
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
        const mosaicAddressRestrictionTransactionBodyBytes = this.mosaicAddressRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicAddressRestrictionTransactionBodyBytes);
        return newArray;
    }
}
