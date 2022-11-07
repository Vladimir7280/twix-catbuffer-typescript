"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicNonce = void 0;
const Utils_1 = require("./Utils");
class MosaicNonce {
    constructor(mosaicNonce) {
        this.mosaicNonce = mosaicNonce;
    }
    static deserialize(payload) {
        const mosaicNonce = Utils_1.Utils.bufferToUint32(Uint8Array.from(payload));
        return new MosaicNonce(mosaicNonce);
    }
    get size() {
        return 4;
    }
    serialize() {
        return Utils_1.Utils.uint32ToBuffer(this.mosaicNonce);
    }
}
exports.MosaicNonce = MosaicNonce;
//# sourceMappingURL=MosaicNonce.js.map