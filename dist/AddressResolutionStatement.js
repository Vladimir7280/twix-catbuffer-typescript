"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressResolutionStatement = void 0;
const AddressResolutionEntry_1 = require("./AddressResolutionEntry");
const UnresolvedAddress_1 = require("./UnresolvedAddress");
const Utils_1 = require("./Utils");
class AddressResolutionStatement {
    constructor({ unresolved, resolutionEntries }) {
        this.unresolved = unresolved;
        this.resolutionEntries = resolutionEntries;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const unresolved = UnresolvedAddress_1.UnresolvedAddress.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, unresolved.size);
        const resolutionEntriesCount = Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const resolutionEntries = Utils_1.Utils.deserialize(AddressResolutionEntry_1.AddressResolutionEntry.deserialize, Uint8Array.from(byteArray), resolutionEntriesCount);
        byteArray.splice(0, resolutionEntries.reduce((sum, c) => sum + c.size, 0));
        return new AddressResolutionStatement({ unresolved: unresolved, resolutionEntries: resolutionEntries });
    }
    get size() {
        let size = 0;
        size += this.unresolved.size;
        size += 4;
        size += this.resolutionEntries.reduce((sum, c) => sum + Utils_1.Utils.getSizeWithPadding(c.size, 0), 0);
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const unresolvedBytes = this.unresolved.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, unresolvedBytes);
        const resolutionEntriesCountBytes = Utils_1.Utils.uint32ToBuffer(this.resolutionEntries.length);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, resolutionEntriesCountBytes);
        const resolutionEntriesBytes = Utils_1.Utils.writeList(this.resolutionEntries, 0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, resolutionEntriesBytes);
        return newArray;
    }
}
exports.AddressResolutionStatement = AddressResolutionStatement;
//# sourceMappingURL=AddressResolutionStatement.js.map