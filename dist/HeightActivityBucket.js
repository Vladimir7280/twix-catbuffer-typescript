"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeightActivityBucket = void 0;
const Amount_1 = require("./Amount");
const ImportanceHeight_1 = require("./ImportanceHeight");
const Utils_1 = require("./Utils");
class HeightActivityBucket {
    constructor({ startHeight, totalFeesPaid, beneficiaryCount, rawScore }) {
        this.startHeight = startHeight;
        this.totalFeesPaid = totalFeesPaid;
        this.beneficiaryCount = beneficiaryCount;
        this.rawScore = rawScore;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const startHeight = ImportanceHeight_1.ImportanceHeight.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, startHeight.size);
        const totalFeesPaid = Amount_1.Amount.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, totalFeesPaid.size);
        const beneficiaryCount = Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const rawScore = Utils_1.Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        return new HeightActivityBucket({
            startHeight: startHeight,
            totalFeesPaid: totalFeesPaid,
            beneficiaryCount: beneficiaryCount,
            rawScore: rawScore,
        });
    }
    get size() {
        let size = 0;
        size += this.startHeight.size;
        size += this.totalFeesPaid.size;
        size += 4;
        size += 8;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const startHeightBytes = this.startHeight.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, startHeightBytes);
        const totalFeesPaidBytes = this.totalFeesPaid.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, totalFeesPaidBytes);
        const beneficiaryCountBytes = Utils_1.Utils.uint32ToBuffer(this.beneficiaryCount);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, beneficiaryCountBytes);
        const rawScoreBytes = Utils_1.Utils.bigIntToBuffer(this.rawScore);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, rawScoreBytes);
        return newArray;
    }
}
exports.HeightActivityBucket = HeightActivityBucket;
//# sourceMappingURL=HeightActivityBucket.js.map