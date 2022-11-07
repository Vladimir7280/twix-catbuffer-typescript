"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicResolutionEntry = void 0;
const MosaicId_1 = require("./MosaicId");
const ReceiptSource_1 = require("./ReceiptSource");
const Utils_1 = require("./Utils");
class MosaicResolutionEntry {
    constructor({ source, resolvedValue }) {
        this.source = source;
        this.resolvedValue = resolvedValue;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const source = ReceiptSource_1.ReceiptSource.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, source.size);
        const resolvedValue = MosaicId_1.MosaicId.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, resolvedValue.size);
        return new MosaicResolutionEntry({ source: source, resolvedValue: resolvedValue });
    }
    get size() {
        let size = 0;
        size += this.source.size;
        size += this.resolvedValue.size;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const sourceBytes = this.source.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, sourceBytes);
        const resolvedValueBytes = this.resolvedValue.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, resolvedValueBytes);
        return newArray;
    }
}
exports.MosaicResolutionEntry = MosaicResolutionEntry;
//# sourceMappingURL=MosaicResolutionEntry.js.map