"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signature = void 0;
const Utils_1 = require("./Utils");
class Signature {
    constructor(signature) {
        this.signature = signature;
    }
    static deserialize(payload) {
        const signature = Utils_1.Utils.getBytes(Uint8Array.from(payload), 64);
        return new Signature(signature);
    }
    get size() {
        return 64;
    }
    serialize() {
        return this.signature;
    }
}
exports.Signature = Signature;
//# sourceMappingURL=Signature.js.map