"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptSource = void 0;
const Utils_1 = require("./Utils");
class ReceiptSource {
    constructor({ primaryId, secondaryId }) {
        this.primaryId = primaryId;
        this.secondaryId = secondaryId;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const primaryId = Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const secondaryId = Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        return new ReceiptSource({ primaryId: primaryId, secondaryId: secondaryId });
    }
    get size() {
        let size = 0;
        size += 4;
        size += 4;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const primaryIdBytes = Utils_1.Utils.uint32ToBuffer(this.primaryId);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, primaryIdBytes);
        const secondaryIdBytes = Utils_1.Utils.uint32ToBuffer(this.secondaryId);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, secondaryIdBytes);
        return newArray;
    }
}
exports.ReceiptSource = ReceiptSource;
//# sourceMappingURL=ReceiptSource.js.map