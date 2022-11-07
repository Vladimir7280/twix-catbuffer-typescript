"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicGlobalRestrictionEntry = void 0;
const GlobalKeyValueSet_1 = require("./GlobalKeyValueSet");
const MosaicId_1 = require("./MosaicId");
const Utils_1 = require("./Utils");
class MosaicGlobalRestrictionEntry {
    constructor({ mosaicId, keyPairs }) {
        this.mosaicId = mosaicId;
        this.keyPairs = keyPairs;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const mosaicId = MosaicId_1.MosaicId.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.size);
        const keyPairs = GlobalKeyValueSet_1.GlobalKeyValueSet.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, keyPairs.size);
        return new MosaicGlobalRestrictionEntry({ mosaicId: mosaicId, keyPairs: keyPairs });
    }
    get size() {
        let size = 0;
        size += this.mosaicId.size;
        size += this.keyPairs.size;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, mosaicIdBytes);
        const keyPairsBytes = this.keyPairs.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, keyPairsBytes);
        return newArray;
    }
}
exports.MosaicGlobalRestrictionEntry = MosaicGlobalRestrictionEntry;
//# sourceMappingURL=MosaicGlobalRestrictionEntry.js.map