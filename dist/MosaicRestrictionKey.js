"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicRestrictionKey = void 0;
const Utils_1 = require("./Utils");
class MosaicRestrictionKey {
    constructor(mosaicRestrictionKey) {
        this.mosaicRestrictionKey = mosaicRestrictionKey;
    }
    static deserialize(payload) {
        const mosaicRestrictionKey = Utils_1.Utils.bufferToBigInt(Uint8Array.from(payload));
        return new MosaicRestrictionKey(mosaicRestrictionKey);
    }
    get size() {
        return 8;
    }
    serialize() {
        return Utils_1.Utils.bigIntToBuffer(this.mosaicRestrictionKey);
    }
}
exports.MosaicRestrictionKey = MosaicRestrictionKey;
//# sourceMappingURL=MosaicRestrictionKey.js.map