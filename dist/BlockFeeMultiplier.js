"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockFeeMultiplier = void 0;
const Utils_1 = require("./Utils");
class BlockFeeMultiplier {
    constructor(blockFeeMultiplier) {
        this.blockFeeMultiplier = blockFeeMultiplier;
    }
    static deserialize(payload) {
        const blockFeeMultiplier = Utils_1.Utils.bufferToUint32(Uint8Array.from(payload));
        return new BlockFeeMultiplier(blockFeeMultiplier);
    }
    get size() {
        return 4;
    }
    serialize() {
        return Utils_1.Utils.uint32ToBuffer(this.blockFeeMultiplier);
    }
}
exports.BlockFeeMultiplier = BlockFeeMultiplier;
//# sourceMappingURL=BlockFeeMultiplier.js.map