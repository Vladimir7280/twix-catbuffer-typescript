"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountRestrictionMosaicValue = void 0;
const MosaicId_1 = require("./MosaicId");
const Utils_1 = require("./Utils");
class AccountRestrictionMosaicValue {
    constructor({ restrictionValues }) {
        this.restrictionValues = restrictionValues;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const restrictionValuesCount = Utils_1.Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const restrictionValues = Utils_1.Utils.deserialize(MosaicId_1.MosaicId.deserialize, Uint8Array.from(byteArray), restrictionValuesCount);
        byteArray.splice(0, restrictionValues.reduce((sum, c) => sum + c.size, 0));
        return new AccountRestrictionMosaicValue({ restrictionValues: restrictionValues });
    }
    get size() {
        let size = 0;
        size += 8;
        size += this.restrictionValues.reduce((sum, c) => sum + Utils_1.Utils.getSizeWithPadding(c.size, 0), 0);
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const restrictionValuesCountBytes = Utils_1.Utils.bigIntToBuffer(this.restrictionValues.length);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, restrictionValuesCountBytes);
        const restrictionValuesBytes = Utils_1.Utils.writeList(this.restrictionValues, 0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, restrictionValuesBytes);
        return newArray;
    }
}
exports.AccountRestrictionMosaicValue = AccountRestrictionMosaicValue;
//# sourceMappingURL=AccountRestrictionMosaicValue.js.map