"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicEntry = void 0;
const Amount_1 = require("./Amount");
const MosaicDefinition_1 = require("./MosaicDefinition");
const MosaicId_1 = require("./MosaicId");
const Utils_1 = require("./Utils");
class MosaicEntry {
    constructor({ version, mosaicId, supply, definition }) {
        this.version = version;
        this.mosaicId = mosaicId;
        this.supply = supply;
        this.definition = definition;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const version = Utils_1.Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const mosaicId = MosaicId_1.MosaicId.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.size);
        const supply = Amount_1.Amount.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, supply.size);
        const definition = MosaicDefinition_1.MosaicDefinition.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, definition.size);
        return new MosaicEntry({ version: version, mosaicId: mosaicId, supply: supply, definition: definition });
    }
    get size() {
        let size = 0;
        size += 2;
        size += this.mosaicId.size;
        size += this.supply.size;
        size += this.definition.size;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const versionBytes = Utils_1.Utils.uint16ToBuffer(this.version);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, versionBytes);
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, mosaicIdBytes);
        const supplyBytes = this.supply.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, supplyBytes);
        const definitionBytes = this.definition.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, definitionBytes);
        return newArray;
    }
}
exports.MosaicEntry = MosaicEntry;
//# sourceMappingURL=MosaicEntry.js.map