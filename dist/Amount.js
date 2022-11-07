"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Amount = void 0;
const Utils_1 = require("./Utils");
class Amount {
    constructor(amount) {
        this.amount = amount;
    }
    static deserialize(payload) {
        const amount = Utils_1.Utils.bufferToBigInt(Uint8Array.from(payload));
        return new Amount(amount);
    }
    get size() {
        return 8;
    }
    serialize() {
        return Utils_1.Utils.bigIntToBuffer(this.amount);
    }
}
exports.Amount = Amount;
//# sourceMappingURL=Amount.js.map