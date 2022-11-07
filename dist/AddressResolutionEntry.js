"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressResolutionEntry = void 0;
const Address_1 = require("./Address");
const ReceiptSource_1 = require("./ReceiptSource");
const Utils_1 = require("./Utils");
class AddressResolutionEntry {
    constructor({ source, resolvedValue }) {
        this.source = source;
        this.resolvedValue = resolvedValue;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const source = ReceiptSource_1.ReceiptSource.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, source.size);
        const resolvedValue = Address_1.Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, resolvedValue.size);
        return new AddressResolutionEntry({ source: source, resolvedValue: resolvedValue });
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
exports.AddressResolutionEntry = AddressResolutionEntry;
//# sourceMappingURL=AddressResolutionEntry.js.map