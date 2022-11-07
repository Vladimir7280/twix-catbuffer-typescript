"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressKeyValueSet = void 0;
const AddressKeyValue_1 = require("./AddressKeyValue");
const Utils_1 = require("./Utils");
class AddressKeyValueSet {
    constructor({ keys }) {
        this.keys = keys;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const keyValueCount = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const keys = Utils_1.Utils.deserialize(AddressKeyValue_1.AddressKeyValue.deserialize, Uint8Array.from(byteArray), keyValueCount);
        byteArray.splice(0, keys.reduce((sum, c) => sum + c.size, 0));
        return new AddressKeyValueSet({ keys: keys });
    }
    get size() {
        let size = 0;
        size += 1;
        size += this.keys.reduce((sum, c) => sum + Utils_1.Utils.getSizeWithPadding(c.size, 0), 0);
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const keyValueCountBytes = Utils_1.Utils.uint8ToBuffer(this.keys.length);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, keyValueCountBytes);
        const keysBytes = Utils_1.Utils.writeList(this.keys, 0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, keysBytes);
        return newArray;
    }
}
exports.AddressKeyValueSet = AddressKeyValueSet;
//# sourceMappingURL=AddressKeyValueSet.js.map