"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timestamp = void 0;
const Utils_1 = require("./Utils");
class Timestamp {
    constructor(timestamp) {
        this.timestamp = timestamp;
    }
    static deserialize(payload) {
        const timestamp = Utils_1.Utils.bufferToBigInt(Uint8Array.from(payload));
        return new Timestamp(timestamp);
    }
    get size() {
        return 8;
    }
    serialize() {
        return Utils_1.Utils.bigIntToBuffer(this.timestamp);
    }
}
exports.Timestamp = Timestamp;
//# sourceMappingURL=Timestamp.js.map