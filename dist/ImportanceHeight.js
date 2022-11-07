"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportanceHeight = void 0;
const Utils_1 = require("./Utils");
class ImportanceHeight {
    constructor(importanceHeight) {
        this.importanceHeight = importanceHeight;
    }
    static deserialize(payload) {
        const importanceHeight = Utils_1.Utils.bufferToBigInt(Uint8Array.from(payload));
        return new ImportanceHeight(importanceHeight);
    }
    get size() {
        return 8;
    }
    serialize() {
        return Utils_1.Utils.bigIntToBuffer(this.importanceHeight);
    }
}
exports.ImportanceHeight = ImportanceHeight;
//# sourceMappingURL=ImportanceHeight.js.map