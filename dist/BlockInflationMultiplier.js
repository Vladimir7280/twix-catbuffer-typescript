"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockInflationMultiplier = void 0;
const Utils_1 = require("./Utils");
class BlockInflationMultiplier {
    constructor(blockInflationMultiplier) {
        this.blockInflationMultiplier = blockInflationMultiplier;
    }
    static deserialize(payload) {
        const blockInflationMultiplier = Utils_1.Utils.bufferToBigInt(Uint8Array.from(payload));
        return new BlockInflationMultiplier(blockInflationMultiplier);
    }
    get size() {
        return 8;
    }
    serialize() {
        return Utils_1.Utils.bigIntToBuffer(this.blockInflationMultiplier);
    }
}
exports.BlockInflationMultiplier = BlockInflationMultiplier;
//# sourceMappingURL=BlockInflationMultiplier.js.map