"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataValue = void 0;
const Utils_1 = require("./Utils");
class MetadataValue {
    constructor({ data }) {
        this.data = data;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const size = Utils_1.Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const data = Utils_1.Utils.getBytes(Uint8Array.from(byteArray), size);
        byteArray.splice(0, size);
        return new MetadataValue({ data: data });
    }
    get size() {
        let size = 0;
        size += 2;
        size += this.data.length;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const sizeBytes = Utils_1.Utils.uint16ToBuffer(this.data.length);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, sizeBytes);
        const dataBytes = this.data;
        newArray = Utils_1.Utils.concatTypedArrays(newArray, dataBytes);
        return newArray;
    }
}
exports.MetadataValue = MetadataValue;
//# sourceMappingURL=MetadataValue.js.map