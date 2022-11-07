"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mosaic = void 0;
const Amount_1 = require("./Amount");
const MosaicId_1 = require("./MosaicId");
const Utils_1 = require("./Utils");
class Mosaic {
    constructor({ mosaicId, amount }) {
        this.mosaicId = mosaicId;
        this.amount = amount;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const mosaicId = MosaicId_1.MosaicId.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.size);
        const amount = Amount_1.Amount.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, amount.size);
        return new Mosaic({ mosaicId: mosaicId, amount: amount });
    }
    get size() {
        let size = 0;
        size += this.mosaicId.size;
        size += this.amount.size;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, mosaicIdBytes);
        const amountBytes = this.amount.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, amountBytes);
        return newArray;
    }
}
exports.Mosaic = Mosaic;
//# sourceMappingURL=Mosaic.js.map