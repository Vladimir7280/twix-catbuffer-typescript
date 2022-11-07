"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinalizationPoint = void 0;
const Utils_1 = require("./Utils");
class FinalizationPoint {
    constructor(finalizationPoint) {
        this.finalizationPoint = finalizationPoint;
    }
    static deserialize(payload) {
        const finalizationPoint = Utils_1.Utils.bufferToUint32(Uint8Array.from(payload));
        return new FinalizationPoint(finalizationPoint);
    }
    get size() {
        return 4;
    }
    serialize() {
        return Utils_1.Utils.uint32ToBuffer(this.finalizationPoint);
    }
}
exports.FinalizationPoint = FinalizationPoint;
//# sourceMappingURL=FinalizationPoint.js.map