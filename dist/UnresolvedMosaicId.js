"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnresolvedMosaicId = void 0;
const Utils_1 = require("./Utils");
class UnresolvedMosaicId {
    constructor(unresolvedMosaicId) {
        this.unresolvedMosaicId = unresolvedMosaicId;
    }
    static deserialize(payload) {
        const unresolvedMosaicId = Utils_1.Utils.bufferToBigInt(Uint8Array.from(payload));
        return new UnresolvedMosaicId(unresolvedMosaicId);
    }
    get size() {
        return 8;
    }
    serialize() {
        return Utils_1.Utils.bigIntToBuffer(this.unresolvedMosaicId);
    }
}
exports.UnresolvedMosaicId = UnresolvedMosaicId;
//# sourceMappingURL=UnresolvedMosaicId.js.map