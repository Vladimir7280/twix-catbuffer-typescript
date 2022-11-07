"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionStatement = void 0;
const Receipt_1 = require("./Receipt");
const Utils_1 = require("./Utils");
class TransactionStatement {
    constructor({ primaryId, secondaryId, receipts }) {
        this.primaryId = primaryId;
        this.secondaryId = secondaryId;
        this.receipts = receipts;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const primaryId = Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const secondaryId = Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const receiptCount = Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const receipts = Utils_1.Utils.deserialize(Receipt_1.Receipt.deserialize, Uint8Array.from(byteArray), receiptCount);
        byteArray.splice(0, receipts.reduce((sum, c) => sum + c.size, 0));
        return new TransactionStatement({ primaryId: primaryId, secondaryId: secondaryId, receipts: receipts });
    }
    get size() {
        let size = 0;
        size += 4;
        size += 4;
        size += 4;
        size += this.receipts.reduce((sum, c) => sum + Utils_1.Utils.getSizeWithPadding(c.size, 0), 0);
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const primaryIdBytes = Utils_1.Utils.uint32ToBuffer(this.primaryId);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, primaryIdBytes);
        const secondaryIdBytes = Utils_1.Utils.uint32ToBuffer(this.secondaryId);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, secondaryIdBytes);
        const receiptCountBytes = Utils_1.Utils.uint32ToBuffer(this.receipts.length);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, receiptCountBytes);
        const receiptsBytes = Utils_1.Utils.writeList(this.receipts, 0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, receiptsBytes);
        return newArray;
    }
}
exports.TransactionStatement = TransactionStatement;
//# sourceMappingURL=TransactionStatement.js.map