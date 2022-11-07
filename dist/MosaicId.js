"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicId = void 0;
const Utils_1 = require("./Utils");
class MosaicId {
    constructor(mosaicId) {
        this.mosaicId = mosaicId;
    }
    static deserialize(payload) {
        const mosaicId = Utils_1.Utils.bufferToBigInt(Uint8Array.from(payload));
        return new MosaicId(mosaicId);
    }
    get size() {
        return 8;
    }
    serialize() {
        return Utils_1.Utils.bigIntToBuffer(this.mosaicId);
    }
}
exports.MosaicId = MosaicId;
//# sourceMappingURL=MosaicId.js.map