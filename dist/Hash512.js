"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hash512 = void 0;
const Utils_1 = require("./Utils");
class Hash512 {
    constructor(hash512) {
        this.hash512 = hash512;
    }
    static deserialize(payload) {
        const hash512 = Utils_1.Utils.getBytes(Uint8Array.from(payload), 64);
        return new Hash512(hash512);
    }
    get size() {
        return 64;
    }
    serialize() {
        return this.hash512;
    }
}
exports.Hash512 = Hash512;
//# sourceMappingURL=Hash512.js.map