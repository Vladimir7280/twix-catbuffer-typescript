"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockCollectedEpochFees = void 0;
const Utils_1 = require("./Utils");
class BlockCollectedEpochFees {
    constructor(blockCollectedEpochFees) {
        this.blockCollectedEpochFees = blockCollectedEpochFees;
    }
    static deserialize(payload) {
        const blockCollectedEpochFees = Utils_1.Utils.bufferToBigInt(Uint8Array.from(payload));
        return new BlockCollectedEpochFees(blockCollectedEpochFees);
    }
    get size() {
        return 8;
    }
    serialize() {
        return Utils_1.Utils.bigIntToBuffer(this.blockCollectedEpochFees);
    }
}
exports.BlockCollectedEpochFees = BlockCollectedEpochFees;
//# sourceMappingURL=BlockCollectedEpochFees.js.map