"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressKeyValue = void 0;
const MosaicRestrictionKey_1 = require("./MosaicRestrictionKey");
const Utils_1 = require("./Utils");
class AddressKeyValue {
    constructor({ key, value }) {
        this.key = key;
        this.value = value;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const key = MosaicRestrictionKey_1.MosaicRestrictionKey.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, key.size);
        const value = Utils_1.Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        return new AddressKeyValue({ key: key, value: value });
    }
    get size() {
        let size = 0;
        size += this.key.size;
        size += 8;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const keyBytes = this.key.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, keyBytes);
        const valueBytes = Utils_1.Utils.bigIntToBuffer(this.value);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, valueBytes);
        return newArray;
    }
}
exports.AddressKeyValue = AddressKeyValue;
//# sourceMappingURL=AddressKeyValue.js.map