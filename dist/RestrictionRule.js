"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestrictionRule = void 0;
const MosaicId_1 = require("./MosaicId");
const Utils_1 = require("./Utils");
class RestrictionRule {
    constructor({ referenceMosaicId, restrictionValue, restrictionType }) {
        this.referenceMosaicId = referenceMosaicId;
        this.restrictionValue = restrictionValue;
        this.restrictionType = restrictionType;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const referenceMosaicId = MosaicId_1.MosaicId.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, referenceMosaicId.size);
        const restrictionValue = Utils_1.Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const restrictionType = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new RestrictionRule({
            referenceMosaicId: referenceMosaicId,
            restrictionValue: restrictionValue,
            restrictionType: restrictionType,
        });
    }
    get size() {
        let size = 0;
        size += this.referenceMosaicId.size;
        size += 8;
        size += 1;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const referenceMosaicIdBytes = this.referenceMosaicId.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, referenceMosaicIdBytes);
        const restrictionValueBytes = Utils_1.Utils.bigIntToBuffer(this.restrictionValue);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, restrictionValueBytes);
        const restrictionTypeBytes = Utils_1.Utils.uint8ToBuffer(this.restrictionType);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, restrictionTypeBytes);
        return newArray;
    }
}
exports.RestrictionRule = RestrictionRule;
//# sourceMappingURL=RestrictionRule.js.map