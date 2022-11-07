"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRestrictionTransactionTypeValue = void 0;
const Utils_1 = require("./Utils");
class AccountRestrictionTransactionTypeValue {
    constructor({ restrictionValues }) {
        this.restrictionValues = restrictionValues;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const restrictionValuesCount = Utils_1.Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const restrictionValues = Utils_1.Utils.deserializeEnums(Uint8Array.from(byteArray), restrictionValuesCount, 2);
        byteArray.splice(0, restrictionValues.reduce((sum) => sum + 2, 0));
        return new AccountRestrictionTransactionTypeValue({ restrictionValues: restrictionValues });
    }
    get size() {
        let size = 0;
        size += 8;
        size += this.restrictionValues.reduce((sum) => sum + 2, 0);
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const restrictionValuesCountBytes = Utils_1.Utils.bigIntToBuffer(this.restrictionValues.length);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, restrictionValuesCountBytes);
        const restrictionValuesBytes = Utils_1.Utils.writeListEnum(this.restrictionValues, 0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, restrictionValuesBytes);
        return newArray;
    }
}
exports.AccountRestrictionTransactionTypeValue = AccountRestrictionTransactionTypeValue;
//# sourceMappingURL=AccountRestrictionTransactionTypeValue.js.map