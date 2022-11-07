"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockInflation = void 0;
const Utils_1 = require("./Utils");
class BlockInflation {
    constructor(blockInflation) {
        this.blockInflation = blockInflation;
    }
    static deserialize(payload) {
        const blockInflation = Utils_1.Utils.bufferToBigInt(Uint8Array.from(payload));
        return new BlockInflation(blockInflation);
    }
    get size() {
        return 8;
    }
    serialize() {
        return Utils_1.Utils.bigIntToBuffer(this.blockInflation);
    }
}
exports.BlockInflation = BlockInflation;
//# sourceMappingURL=BlockInflation.js.map