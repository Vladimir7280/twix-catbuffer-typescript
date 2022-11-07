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
import { AccountRestrictionAddressValue } from './AccountRestrictionAddressValue';
import { AccountRestrictionFlags } from './AccountRestrictionFlags';
import { AccountRestrictionMosaicValue } from './AccountRestrictionMosaicValue';
import { AccountRestrictionTransactionTypeValue } from './AccountRestrictionTransactionTypeValue';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of AccountRestrictionsInfo
 */
export interface AccountRestrictionsInfoParams {
    /**
     * raw restriction flags
     */
    restrictionFlags: AccountRestrictionFlags[];
    /**
     * address restrictions
     */
    addressRestrictions?: AccountRestrictionAddressValue;
    /**
     * mosaic identifier restrictions
     */
    mosaicIdRestrictions?: AccountRestrictionMosaicValue;
    /**
     * transaction type restrictions
     */
    transactionTypeRestrictions?: AccountRestrictionTransactionTypeValue;
}

/**
 * binary layout for account restrictions
 */
export class AccountRestrictionsInfo implements Serializer {
    /**
     * raw restriction flags
     */
    public readonly restrictionFlags: AccountRestrictionFlags[];
    /**
     * address restrictions
     */
    public readonly addressRestrictions?: AccountRestrictionAddressValue;
    /**
     * mosaic identifier restrictions
     */
    public readonly mosaicIdRestrictions?: AccountRestrictionMosaicValue;
    /**
     * transaction type restrictions
     */
    public readonly transactionTypeRestrictions?: AccountRestrictionTransactionTypeValue;

    /**
     * Constructor
     * @param restrictionFlags - raw restriction flags
     * @param addressRestrictions - address restrictions
     * @param mosaicIdRestrictions - mosaic identifier restrictions
     * @param transactionTypeRestrictions - transaction type restrictions
     */
    constructor({
        restrictionFlags,
        addressRestrictions,
        mosaicIdRestrictions,
        transactionTypeRestrictions,
    }: AccountRestrictionsInfoParams) {
        this.restrictionFlags = restrictionFlags;
        this.addressRestrictions = addressRestrictions;
        this.mosaicIdRestrictions = mosaicIdRestrictions;
        this.transactionTypeRestrictions = transactionTypeRestrictions;
    }

    /**
     * Creates an instance of AccountRestrictionsInfo from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of AccountRestrictionsInfo from binary payload
     */
    public static deserialize(payload: Uint8Array): AccountRestrictionsInfo {
        const byteArray = Array.from(payload);
        const restrictionFlags = Utils.toFlags(AccountRestrictionFlags, Utils.bufferToUint16(Uint8Array.from(byteArray)));
        byteArray.splice(0, 2);
        let addressRestrictions: AccountRestrictionAddressValue | undefined;
        if (restrictionFlags.indexOf(AccountRestrictionFlags.ADDRESS) > -1) {
            addressRestrictions = AccountRestrictionAddressValue.deserialize(Uint8Array.from(byteArray));
            byteArray.splice(0, addressRestrictions.size);
        }
        let mosaicIdRestrictions: AccountRestrictionMosaicValue | undefined;
        if (restrictionFlags.indexOf(AccountRestrictionFlags.MOSAIC_ID) > -1) {
            mosaicIdRestrictions = AccountRestrictionMosaicValue.deserialize(Uint8Array.from(byteArray));
            byteArray.splice(0, mosaicIdRestrictions.size);
        }
        let transactionTypeRestrictions: AccountRestrictionTransactionTypeValue | undefined;
        if (restrictionFlags.indexOf(AccountRestrictionFlags.TRANSACTION_TYPE) > -1) {
            transactionTypeRestrictions = AccountRestrictionTransactionTypeValue.deserialize(Uint8Array.from(byteArray));
            byteArray.splice(0, transactionTypeRestrictions.size);
        }
        return new AccountRestrictionsInfo({
            restrictionFlags: restrictionFlags,
            addressRestrictions: addressRestrictions,
            mosaicIdRestrictions: mosaicIdRestrictions,
            transactionTypeRestrictions: transactionTypeRestrictions,
        });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += 2; // restrictionFlags;
        if (this.restrictionFlags.indexOf(AccountRestrictionFlags.ADDRESS) > -1) {
            size += this.addressRestrictions!.size; // addressRestrictions;
        }
        if (this.restrictionFlags.indexOf(AccountRestrictionFlags.MOSAIC_ID) > -1) {
            size += this.mosaicIdRestrictions!.size; // mosaicIdRestrictions;
        }
        if (this.restrictionFlags.indexOf(AccountRestrictionFlags.TRANSACTION_TYPE) > -1) {
            size += this.transactionTypeRestrictions!.size; // transactionTypeRestrictions;
        }
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const restrictionFlagsBytes = Utils.uint16ToBuffer(Utils.fromFlags(AccountRestrictionFlags, this.restrictionFlags));
        newArray = Utils.concatTypedArrays(newArray, restrictionFlagsBytes);
        if (this.restrictionFlags.indexOf(AccountRestrictionFlags.ADDRESS) > -1) {
            const addressRestrictionsBytes = this.addressRestrictions!.serialize();
            newArray = Utils.concatTypedArrays(newArray, addressRestrictionsBytes);
        }
        if (this.restrictionFlags.indexOf(AccountRestrictionFlags.MOSAIC_ID) > -1) {
            const mosaicIdRestrictionsBytes = this.mosaicIdRestrictions!.serialize();
            newArray = Utils.concatTypedArrays(newArray, mosaicIdRestrictionsBytes);
        }
        if (this.restrictionFlags.indexOf(AccountRestrictionFlags.TRANSACTION_TYPE) > -1) {
            const transactionTypeRestrictionsBytes = this.transactionTypeRestrictions!.serialize();
            newArray = Utils.concatTypedArrays(newArray, transactionTypeRestrictionsBytes);
        }
        return newArray;
    }
}
