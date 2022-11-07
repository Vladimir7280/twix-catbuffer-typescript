"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hash256 = void 0;
const Utils_1 = require("./Utils");
class Hash256 {
    constructor(hash256) {
        this.hash256 = hash256;
    }
    static deserialize(payload) {
        const hash256 = Utils_1.Utils.getBytes(Uint8Array.from(payload), 32);
        return new Hash256(hash256);
    }
    get size() {
        return 32;
    }
    serialize() {
        return this.hash256;
    }
}
exports.Hash256 = Hash256;
//# sourceMappingURL=Hash256.js.map