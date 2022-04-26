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
import { MosaicGlobalRestrictionTransactionBodyBuilder } from './MosaicGlobalRestrictionTransactionBodyBuilder';
import { MosaicRestrictionTypeDto } from './MosaicRestrictionTypeDto';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { TransactionTypeDto } from './TransactionTypeDto';
import { UnresolvedMosaicIdDto } from './UnresolvedMosaicIdDto';

/**
 * Embedded version of MosaicGlobalRestrictionTransaction.
 **/
export class EmbeddedMosaicGlobalRestrictionTransactionBuilder extends EmbeddedTransactionBuilder implements Serializer {
    /** Mosaic global restriction transaction body. **/
    readonly mosaicGlobalRestrictionTransactionBody: MosaicGlobalRestrictionTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param mosaicId Identifier of the mosaic being restricted. The mosaic creator must be the signer of the transaction..
     * @param referenceMosaicId Identifier of the mosaic providing the restriction key. The mosaic global restriction for the mosaic identifier depends on global restrictions set on the reference mosaic. Set `reference_mosaic_id` to **0** if the mosaic giving the restriction equals the `mosaic_id`..
     * @param restrictionKey Restriction key relative to the reference mosaic identifier..
     * @param previousRestrictionValue Previous restriction value..
     * @param newRestrictionValue New restriction value..
     * @param previousRestrictionType Previous restriction type..
     * @param newRestrictionType New restriction type..
     */
    public constructor(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        mosaicId: UnresolvedMosaicIdDto,
        referenceMosaicId: UnresolvedMosaicIdDto,
        restrictionKey: number[],
        previousRestrictionValue: number[],
        newRestrictionValue: number[],
        previousRestrictionType: MosaicRestrictionTypeDto,
        newRestrictionType: MosaicRestrictionTypeDto,
    ) {
        super(signerPublicKey, version, network, type);
        this.mosaicGlobalRestrictionTransactionBody = new MosaicGlobalRestrictionTransactionBodyBuilder(
            mosaicId,
            referenceMosaicId,
            restrictionKey,
            previousRestrictionValue,
            newRestrictionValue,
            previousRestrictionType,
            newRestrictionType,
        );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): EmbeddedMosaicGlobalRestrictionTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const mosaicGlobalRestrictionTransactionBody: MosaicGlobalRestrictionTransactionBodyBuilder =
            MosaicGlobalRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicGlobalRestrictionTransactionBody.getSize());
        return new EmbeddedMosaicGlobalRestrictionTransactionBuilder(
            superObject.signerPublicKey,
            superObject.version,
            superObject.network,
            superObject.type,
            mosaicGlobalRestrictionTransactionBody.mosaicId,
            mosaicGlobalRestrictionTransactionBody.referenceMosaicId,
            mosaicGlobalRestrictionTransactionBody.restrictionKey,
            mosaicGlobalRestrictionTransactionBody.previousRestrictionValue,
            mosaicGlobalRestrictionTransactionBody.newRestrictionValue,
            mosaicGlobalRestrictionTransactionBody.previousRestrictionType,
            mosaicGlobalRestrictionTransactionBody.newRestrictionType,
        );
    }

    /**
     * Creates an instance of EmbeddedMosaicGlobalRestrictionTransactionBuilder.
     *
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param mosaicId Identifier of the mosaic being restricted. The mosaic creator must be the signer of the transaction..
     * @param referenceMosaicId Identifier of the mosaic providing the restriction key. The mosaic global restriction for the mosaic identifier depends on global restrictions set on the reference mosaic. Set `reference_mosaic_id` to **0** if the mosaic giving the restriction equals the `mosaic_id`..
     * @param restrictionKey Restriction key relative to the reference mosaic identifier..
     * @param previousRestrictionValue Previous restriction value..
     * @param newRestrictionValue New restriction value..
     * @param previousRestrictionType Previous restriction type..
     * @param newRestrictionType New restriction type..
     * @return Instance of EmbeddedMosaicGlobalRestrictionTransactionBuilder.
     */
    public static createEmbeddedMosaicGlobalRestrictionTransactionBuilder(
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        mosaicId: UnresolvedMosaicIdDto,
        referenceMosaicId: UnresolvedMosaicIdDto,
        restrictionKey: number[],
        previousRestrictionValue: number[],
        newRestrictionValue: number[],
        previousRestrictionType: MosaicRestrictionTypeDto,
        newRestrictionType: MosaicRestrictionTypeDto,
    ): EmbeddedMosaicGlobalRestrictionTransactionBuilder {
        return new EmbeddedMosaicGlobalRestrictionTransactionBuilder(
            signerPublicKey,
            version,
            network,
            type,
            mosaicId,
            referenceMosaicId,
            restrictionKey,
            previousRestrictionValue,
            newRestrictionValue,
            previousRestrictionType,
            newRestrictionType,
        );
    }

    /**
     * Gets Identifier of the mosaic being restricted. The mosaic creator must be the signer of the transaction..
     *
     * @return Identifier of the mosaic being restricted. The mosaic creator must be the signer of the transaction..
     */
    public getMosaicId(): UnresolvedMosaicIdDto {
        return this.mosaicGlobalRestrictionTransactionBody.getMosaicId();
    }

    /**
     * Gets Identifier of the mosaic providing the restriction key. The mosaic global restriction for the mosaic identifier depends on global restrictions set on the reference mosaic. Set `reference_mosaic_id` to **0** if the mosaic giving the restriction equals the `mosaic_id`..
     *
     * @return Identifier of the mosaic providing the restriction key. The mosaic global restriction for the mosaic identifier depends on global restrictions set on the reference mosaic. Set `reference_mosaic_id` to **0** if the mosaic giving the restriction equals the `mosaic_id`..
     */
    public getReferenceMosaicId(): UnresolvedMosaicIdDto {
        return this.mosaicGlobalRestrictionTransactionBody.getReferenceMosaicId();
    }

    /**
     * Gets Restriction key relative to the reference mosaic identifier..
     *
     * @return Restriction key relative to the reference mosaic identifier..
     */
    public getRestrictionKey(): number[] {
        return this.mosaicGlobalRestrictionTransactionBody.getRestrictionKey();
    }

    /**
     * Gets Previous restriction value..
     *
     * @return Previous restriction value..
     */
    public getPreviousRestrictionValue(): number[] {
        return this.mosaicGlobalRestrictionTransactionBody.getPreviousRestrictionValue();
    }

    /**
     * Gets New restriction value..
     *
     * @return New restriction value..
     */
    public getNewRestrictionValue(): number[] {
        return this.mosaicGlobalRestrictionTransactionBody.getNewRestrictionValue();
    }

    /**
     * Gets Previous restriction type..
     *
     * @return Previous restriction type..
     */
    public getPreviousRestrictionType(): MosaicRestrictionTypeDto {
        return this.mosaicGlobalRestrictionTransactionBody.getPreviousRestrictionType();
    }

    /**
     * Gets New restriction type..
     *
     * @return New restriction type..
     */
    public getNewRestrictionType(): MosaicRestrictionTypeDto {
        return this.mosaicGlobalRestrictionTransactionBody.getNewRestrictionType();
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.mosaicGlobalRestrictionTransactionBody.getSize(); // mosaicGlobalRestrictionTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public getBody(): MosaicGlobalRestrictionTransactionBodyBuilder {
        return this.mosaicGlobalRestrictionTransactionBody;
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
        const mosaicGlobalRestrictionTransactionBodyBytes = this.mosaicGlobalRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, mosaicGlobalRestrictionTransactionBodyBytes);
        return newArray;
    }
}
