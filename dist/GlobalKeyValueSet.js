"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalKeyValueSet = void 0;
const GlobalKeyValue_1 = require("./GlobalKeyValue");
const Utils_1 = require("./Utils");
class GlobalKeyValueSet {
    constructor({ keys }) {
        this.keys = keys;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const keyValueCount = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const keys = Utils_1.Utils.deserialize(GlobalKeyValue_1.GlobalKeyValue.deserialize, Uint8Array.from(byteArray), keyValueCount);
        byteArray.splice(0, keys.reduce((sum, c) => sum + c.size, 0));
        return new GlobalKeyValueSet({ keys: keys });
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
exports.GlobalKeyValueSet = GlobalKeyValueSet;
//# sourceMappingURL=GlobalKeyValueSet.js.map