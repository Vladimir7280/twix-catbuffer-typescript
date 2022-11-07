"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinalizationRound = void 0;
const FinalizationEpoch_1 = require("./FinalizationEpoch");
const FinalizationPoint_1 = require("./FinalizationPoint");
const Utils_1 = require("./Utils");
class FinalizationRound {
    constructor({ epoch, point }) {
        this.epoch = epoch;
        this.point = point;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const epoch = FinalizationEpoch_1.FinalizationEpoch.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, epoch.size);
        const point = FinalizationPoint_1.FinalizationPoint.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, point.size);
        return new FinalizationRound({ epoch: epoch, point: point });
    }
    get size() {
        let size = 0;
        size += this.epoch.size;
        size += this.point.size;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const epochBytes = this.epoch.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, epochBytes);
        const pointBytes = this.point.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, pointBytes);
        return newArray;
    }
}
exports.FinalizationRound = FinalizationRound;
//# sourceMappingURL=FinalizationRound.js.map