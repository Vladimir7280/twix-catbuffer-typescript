"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinalizationEpoch = void 0;
const Utils_1 = require("./Utils");
class FinalizationEpoch {
    constructor(finalizationEpoch) {
        this.finalizationEpoch = finalizationEpoch;
    }
    static deserialize(payload) {
        const finalizationEpoch = Utils_1.Utils.bufferToUint32(Uint8Array.from(payload));
        return new FinalizationEpoch(finalizationEpoch);
    }
    get size() {
        return 4;
    }
    serialize() {
        return Utils_1.Utils.uint32ToBuffer(this.finalizationEpoch);
    }
}
exports.FinalizationEpoch = FinalizationEpoch;
//# sourceMappingURL=FinalizationEpoch.js.map