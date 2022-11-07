"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopedMetadataKey = void 0;
const Utils_1 = require("./Utils");
class ScopedMetadataKey {
    constructor(scopedMetadataKey) {
        this.scopedMetadataKey = scopedMetadataKey;
    }
    static deserialize(payload) {
        const scopedMetadataKey = Utils_1.Utils.bufferToBigInt(Uint8Array.from(payload));
        return new ScopedMetadataKey(scopedMetadataKey);
    }
    get size() {
        return 8;
    }
    serialize() {
        return Utils_1.Utils.bigIntToBuffer(this.scopedMetadataKey);
    }
}
exports.ScopedMetadataKey = ScopedMetadataKey;
//# sourceMappingURL=ScopedMetadataKey.js.map