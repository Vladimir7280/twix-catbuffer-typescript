"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicKey = void 0;
const Utils_1 = require("./Utils");
class PublicKey {
    constructor(publicKey) {
        this.publicKey = publicKey;
    }
    static deserialize(payload) {
        const publicKey = Utils_1.Utils.getBytes(Uint8Array.from(payload), 32);
        return new PublicKey(publicKey);
    }
    get size() {
        return 32;
    }
    serialize() {
        return this.publicKey;
    }
}
exports.PublicKey = PublicKey;
//# sourceMappingURL=PublicKey.js.map