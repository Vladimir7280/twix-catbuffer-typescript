"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockFeeToPay = void 0;
const Utils_1 = require("./Utils");
class BlockFeeToPay {
    constructor(blockFeeToPay) {
        this.blockFeeToPay = blockFeeToPay;
    }
    static deserialize(payload) {
        const blockFeeToPay = Utils_1.Utils.bufferToBigInt(Uint8Array.from(payload));
        return new BlockFeeToPay(blockFeeToPay);
    }
    get size() {
        return 8;
    }
    serialize() {
        return Utils_1.Utils.bigIntToBuffer(this.blockFeeToPay);
    }
}
exports.BlockFeeToPay = BlockFeeToPay;
//# sourceMappingURL=BlockFeeToPay.js.map