"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockDuration = void 0;
const Utils_1 = require("./Utils");
class BlockDuration {
    constructor(blockDuration) {
        this.blockDuration = blockDuration;
    }
    static deserialize(payload) {
        const blockDuration = Utils_1.Utils.bufferToBigInt(Uint8Array.from(payload));
        return new BlockDuration(blockDuration);
    }
    get size() {
        return 8;
    }
    serialize() {
        return Utils_1.Utils.bigIntToBuffer(this.blockDuration);
    }
}
exports.BlockDuration = BlockDuration;
//# sourceMappingURL=BlockDuration.js.map