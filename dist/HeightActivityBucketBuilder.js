"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeightActivityBucketBuilder = void 0;
const AmountDto_1 = require("./AmountDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const ImportanceHeightDto_1 = require("./ImportanceHeightDto");
class HeightActivityBucketBuilder {
    constructor(startHeight, totalFeesPaid, beneficiaryCount, rawScore) {
        GeneratorUtils_1.GeneratorUtils.notNull(startHeight, 'startHeight is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(totalFeesPaid, 'totalFeesPaid is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(beneficiaryCount, 'beneficiaryCount is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(rawScore, 'rawScore is null or undefined');
        this.startHeight = startHeight;
        this.totalFeesPaid = totalFeesPaid;
        this.beneficiaryCount = beneficiaryCount;
        this.rawScore = rawScore;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const startHeight = ImportanceHeightDto_1.ImportanceHeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, startHeight.getSize());
        const totalFeesPaid = AmountDto_1.AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, totalFeesPaid.getSize());
        const beneficiaryCount = GeneratorUtils_1.GeneratorUtils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const rawScore = GeneratorUtils_1.GeneratorUtils.bufferToUint64(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        return new HeightActivityBucketBuilder(startHeight, totalFeesPaid, beneficiaryCount, rawScore);
    }
    static createHeightActivityBucketBuilder(startHeight, totalFeesPaid, beneficiaryCount, rawScore) {
        return new HeightActivityBucketBuilder(startHeight, totalFeesPaid, beneficiaryCount, rawScore);
    }
    getStartHeight() {
        return this.startHeight;
    }
    getTotalFeesPaid() {
        return this.totalFeesPaid;
    }
    getBeneficiaryCount() {
        return this.beneficiaryCount;
    }
    getRawScore() {
        return this.rawScore;
    }
    getSize() {
        let size = 0;
        size += this.startHeight.getSize();
        size += this.totalFeesPaid.getSize();
        size += 4;
        size += 8;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const startHeightBytes = this.startHeight.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, startHeightBytes);
        const totalFeesPaidBytes = this.totalFeesPaid.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, totalFeesPaidBytes);
        const beneficiaryCountBytes = GeneratorUtils_1.GeneratorUtils.uint32ToBuffer(this.getBeneficiaryCount());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, beneficiaryCountBytes);
        const rawScoreBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getRawScore());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, rawScoreBytes);
        return newArray;
    }
}
exports.HeightActivityBucketBuilder = HeightActivityBucketBuilder;
//# sourceMappingURL=HeightActivityBucketBuilder.js.map