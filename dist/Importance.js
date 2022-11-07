"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Importance = void 0;
const Utils_1 = require("./Utils");
class Importance {
    constructor(importance) {
        this.importance = importance;
    }
    static deserialize(payload) {
        const importance = Utils_1.Utils.bufferToBigInt(Uint8Array.from(payload));
        return new Importance(importance);
    }
    get size() {
        return 8;
    }
    serialize() {
        return Utils_1.Utils.bigIntToBuffer(this.importance);
    }
}
exports.Importance = Importance;
//# sourceMappingURL=Importance.js.map