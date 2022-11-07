"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Height = void 0;
const Utils_1 = require("./Utils");
class Height {
    constructor(height) {
        this.height = height;
    }
    static deserialize(payload) {
        const height = Utils_1.Utils.bufferToBigInt(Uint8Array.from(payload));
        return new Height(height);
    }
    get size() {
        return 8;
    }
    serialize() {
        return Utils_1.Utils.bigIntToBuffer(this.height);
    }
}
exports.Height = Height;
//# sourceMappingURL=Height.js.map