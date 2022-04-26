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

import { AccountOperationRestrictionTransactionBodyBuilder } from './AccountOperationRestrictionTransactionBodyBuilder';
import { AccountRestrictionFlagsDto } from './AccountRestrictionFlagsDto';
import { AmountDto } from './AmountDto';
import { GeneratorUtils } from './GeneratorUtils';
import { NetworkTypeDto } from './NetworkTypeDto';
import { PublicKeyDto } from './PublicKeyDto';
import { Serializer } from './Serializer';
import { SignatureDto } from './SignatureDto';
import { TimestampDto } from './TimestampDto';
import { TransactionBuilder } from './TransactionBuilder';
import { TransactionTypeDto } from './TransactionTypeDto';

/**
 * Allow or block outgoing transactions depending on their transaction type.
 **/
export class AccountOperationRestrictionTransactionBuilder extends TransactionBuilder implements Serializer {
    /** Account operation restriction transaction body. **/
    readonly accountOperationRestrictionTransactionBody: AccountOperationRestrictionTransactionBodyBuilder;

    /**
     * Constructor.
     *
     * @param signature Entity's signature generated by the signing account..
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param restrictionFlags Type of restriction being applied to the listed transaction types..
     * @param restrictionAdditions Array of transaction types being added to the restricted list..
     * @param restrictionDeletions Array of transaction types being rtemoved from the restricted list..
     */
    public constructor(
        signature: SignatureDto,
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        fee: AmountDto,
        deadline: TimestampDto,
        restrictionFlags: AccountRestrictionFlagsDto[],
        restrictionAdditions: TransactionTypeDto[],
        restrictionDeletions: TransactionTypeDto[],
    ) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.accountOperationRestrictionTransactionBody = new AccountOperationRestrictionTransactionBodyBuilder(
            restrictionFlags,
            restrictionAdditions,
            restrictionDeletions,
        );
    }

    /**
     * Load from binary array - Creates an object from payload.
     *
     * @param payload - Byte payload to use to serialize the object.
     */

    public static loadFromBinary(payload: Uint8Array): AccountOperationRestrictionTransactionBuilder {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const accountOperationRestrictionTransactionBody: AccountOperationRestrictionTransactionBodyBuilder =
            AccountOperationRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountOperationRestrictionTransactionBody.getSize());
        return new AccountOperationRestrictionTransactionBuilder(
            superObject.signature,
            superObject.signerPublicKey,
            superObject.version,
            superObject.network,
            superObject.type,
            superObject.fee,
            superObject.deadline,
            accountOperationRestrictionTransactionBody.restrictionFlags,
            accountOperationRestrictionTransactionBody.restrictionAdditions,
            accountOperationRestrictionTransactionBody.restrictionDeletions,
        );
    }

    /**
     * Creates an instance of AccountOperationRestrictionTransactionBuilder.
     *
     * @param signature Entity's signature generated by the signing account..
     * @param signerPublicKey Public key of the signer of the entity..
     * @param version Version of this structure..
     * @param network Network on which this entity was created..
     * @param type Transaction type.
     * @param fee Transaction fee.
     * @param deadline Transaction deadline.
     * @param restrictionFlags Type of restriction being applied to the listed transaction types..
     * @param restrictionAdditions Array of transaction types being added to the restricted list..
     * @param restrictionDeletions Array of transaction types being rtemoved from the restricted list..
     * @return Instance of AccountOperationRestrictionTransactionBuilder.
     */
    public static createAccountOperationRestrictionTransactionBuilder(
        signature: SignatureDto,
        signerPublicKey: PublicKeyDto,
        version: number,
        network: NetworkTypeDto,
        type: TransactionTypeDto,
        fee: AmountDto,
        deadline: TimestampDto,
        restrictionFlags: AccountRestrictionFlagsDto[],
        restrictionAdditions: TransactionTypeDto[],
        restrictionDeletions: TransactionTypeDto[],
    ): AccountOperationRestrictionTransactionBuilder {
        return new AccountOperationRestrictionTransactionBuilder(
            signature,
            signerPublicKey,
            version,
            network,
            type,
            fee,
            deadline,
            restrictionFlags,
            restrictionAdditions,
            restrictionDeletions,
        );
    }

    /**
     * Gets Type of restriction being applied to the listed transaction types..
     *
     * @return Type of restriction being applied to the listed transaction types..
     */
    public getRestrictionFlags(): AccountRestrictionFlagsDto[] {
        return this.accountOperationRestrictionTransactionBody.getRestrictionFlags();
    }

    /**
     * Gets Array of transaction types being added to the restricted list..
     *
     * @return Array of transaction types being added to the restricted list..
     */
    public getRestrictionAdditions(): TransactionTypeDto[] {
        return this.accountOperationRestrictionTransactionBody.getRestrictionAdditions();
    }

    /**
     * Gets Array of transaction types being rtemoved from the restricted list..
     *
     * @return Array of transaction types being rtemoved from the restricted list..
     */
    public getRestrictionDeletions(): TransactionTypeDto[] {
        return this.accountOperationRestrictionTransactionBody.getRestrictionDeletions();
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = super.getSize();
        size += this.accountOperationRestrictionTransactionBody.getSize(); // accountOperationRestrictionTransactionBody
        return size;
    }

    /**
     * Gets the body builder of the object.
     *
     * @return Body builder.
     */
    public getBody(): AccountOperationRestrictionTransactionBodyBuilder {
        return this.accountOperationRestrictionTransactionBody;
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
        const accountOperationRestrictionTransactionBodyBytes = this.accountOperationRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, accountOperationRestrictionTransactionBodyBytes);
        return newArray;
    }
}