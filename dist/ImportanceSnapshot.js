"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportanceSnapshot = void 0;
const Importance_1 = require("./Importance");
const ImportanceHeight_1 = require("./ImportanceHeight");
const Utils_1 = require("./Utils");
class ImportanceSnapshot {
    constructor({ importance, height }) {
        this.importance = importance;
        this.height = height;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const importance = Importance_1.Importance.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, importance.size);
        const height = ImportanceHeight_1.ImportanceHeight.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, height.size);
        return new ImportanceSnapshot({ importance: importance, height: height });
    }
    get size() {
        let size = 0;
        size += this.importance.size;
        size += this.height.size;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const importanceBytes = this.importance.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, importanceBytes);
        const heightBytes = this.height.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, heightBytes);
        return newArray;
    }
}
exports.ImportanceSnapshot = ImportanceSnapshot;
//# sourceMappingURL=ImportanceSnapshot.js.map