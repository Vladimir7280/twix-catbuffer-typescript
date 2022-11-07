"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalKeyValue = void 0;
const MosaicRestrictionKey_1 = require("./MosaicRestrictionKey");
const RestrictionRule_1 = require("./RestrictionRule");
const Utils_1 = require("./Utils");
class GlobalKeyValue {
    constructor({ key, restrictionRule }) {
        this.key = key;
        this.restrictionRule = restrictionRule;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const key = MosaicRestrictionKey_1.MosaicRestrictionKey.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, key.size);
        const restrictionRule = RestrictionRule_1.RestrictionRule.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, restrictionRule.size);
        return new GlobalKeyValue({ key: key, restrictionRule: restrictionRule });
    }
    get size() {
        let size = 0;
        size += this.key.size;
        size += this.restrictionRule.size;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const keyBytes = this.key.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, keyBytes);
        const restrictionRuleBytes = this.restrictionRule.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, restrictionRuleBytes);
        return newArray;
    }
}
exports.GlobalKeyValue = GlobalKeyValue;
//# sourceMappingURL=GlobalKeyValue.js.map