"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRestrictionsInfo = void 0;
const AccountRestrictionAddressValue_1 = require("./AccountRestrictionAddressValue");
const AccountRestrictionFlags_1 = require("./AccountRestrictionFlags");
const AccountRestrictionMosaicValue_1 = require("./AccountRestrictionMosaicValue");
const AccountRestrictionTransactionTypeValue_1 = require("./AccountRestrictionTransactionTypeValue");
const Utils_1 = require("./Utils");
class AccountRestrictionsInfo {
    constructor({ restrictionFlags, addressRestrictions, mosaicIdRestrictions, transactionTypeRestrictions, }) {
        this.restrictionFlags = restrictionFlags;
        this.addressRestrictions = addressRestrictions;
        this.mosaicIdRestrictions = mosaicIdRestrictions;
        this.transactionTypeRestrictions = transactionTypeRestrictions;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const restrictionFlags = Utils_1.Utils.toFlags(AccountRestrictionFlags_1.AccountRestrictionFlags, Utils_1.Utils.bufferToUint16(Uint8Array.from(byteArray)));
        byteArray.splice(0, 2);
        let addressRestrictions;
        if (restrictionFlags.indexOf(AccountRestrictionFlags_1.AccountRestrictionFlags.ADDRESS) > -1) {
            addressRestrictions = AccountRestrictionAddressValue_1.AccountRestrictionAddressValue.deserialize(Uint8Array.from(byteArray));
            byteArray.splice(0, addressRestrictions.size);
        }
        let mosaicIdRestrictions;
        if (restrictionFlags.indexOf(AccountRestrictionFlags_1.AccountRestrictionFlags.MOSAIC_ID) > -1) {
            mosaicIdRestrictions = AccountRestrictionMosaicValue_1.AccountRestrictionMosaicValue.deserialize(Uint8Array.from(byteArray));
            byteArray.splice(0, mosaicIdRestrictions.size);
        }
        let transactionTypeRestrictions;
        if (restrictionFlags.indexOf(AccountRestrictionFlags_1.AccountRestrictionFlags.TRANSACTION_TYPE) > -1) {
            transactionTypeRestrictions = AccountRestrictionTransactionTypeValue_1.AccountRestrictionTransactionTypeValue.deserialize(Uint8Array.from(byteArray));
            byteArray.splice(0, transactionTypeRestrictions.size);
        }
        return new AccountRestrictionsInfo({
            restrictionFlags: restrictionFlags,
            addressRestrictions: addressRestrictions,
            mosaicIdRestrictions: mosaicIdRestrictions,
            transactionTypeRestrictions: transactionTypeRestrictions,
        });
    }
    get size() {
        let size = 0;
        size += 2;
        if (this.restrictionFlags.indexOf(AccountRestrictionFlags_1.AccountRestrictionFlags.ADDRESS) > -1) {
            size += this.addressRestrictions.size;
        }
        if (this.restrictionFlags.indexOf(AccountRestrictionFlags_1.AccountRestrictionFlags.MOSAIC_ID) > -1) {
            size += this.mosaicIdRestrictions.size;
        }
        if (this.restrictionFlags.indexOf(AccountRestrictionFlags_1.AccountRestrictionFlags.TRANSACTION_TYPE) > -1) {
            size += this.transactionTypeRestrictions.size;
        }
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const restrictionFlagsBytes = Utils_1.Utils.uint16ToBuffer(Utils_1.Utils.fromFlags(AccountRestrictionFlags_1.AccountRestrictionFlags, this.restrictionFlags));
        newArray = Utils_1.Utils.concatTypedArrays(newArray, restrictionFlagsBytes);
        if (this.restrictionFlags.indexOf(AccountRestrictionFlags_1.AccountRestrictionFlags.ADDRESS) > -1) {
            const addressRestrictionsBytes = this.addressRestrictions.serialize();
            newArray = Utils_1.Utils.concatTypedArrays(newArray, addressRestrictionsBytes);
        }
        if (this.restrictionFlags.indexOf(AccountRestrictionFlags_1.AccountRestrictionFlags.MOSAIC_ID) > -1) {
            const mosaicIdRestrictionsBytes = this.mosaicIdRestrictions.serialize();
            newArray = Utils_1.Utils.concatTypedArrays(newArray, mosaicIdRestrictionsBytes);
        }
        if (this.restrictionFlags.indexOf(AccountRestrictionFlags_1.AccountRestrictionFlags.TRANSACTION_TYPE) > -1) {
            const transactionTypeRestrictionsBytes = this.transactionTypeRestrictions.serialize();
            newArray = Utils_1.Utils.concatTypedArrays(newArray, transactionTypeRestrictionsBytes);
        }
        return newArray;
    }
}
exports.AccountRestrictionsInfo = AccountRestrictionsInfo;
//# sourceMappingURL=AccountRestrictionsInfo.js.map