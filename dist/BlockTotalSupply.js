"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockTotalSupply = void 0;
const Utils_1 = require("./Utils");
class BlockTotalSupply {
    constructor(blockTotalSupply) {
        this.blockTotalSupply = blockTotalSupply;
    }
    static deserialize(payload) {
        const blockTotalSupply = Utils_1.Utils.bufferToBigInt(Uint8Array.from(payload));
        return new BlockTotalSupply(blockTotalSupply);
    }
    get size() {
        return 8;
    }
    serialize() {
        return Utils_1.Utils.bigIntToBuffer(this.blockTotalSupply);
    }
}
exports.BlockTotalSupply = BlockTotalSupply;
//# sourceMappingURL=BlockTotalSupply.js.map