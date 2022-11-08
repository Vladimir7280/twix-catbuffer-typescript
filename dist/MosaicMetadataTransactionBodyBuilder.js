"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicMetadataTransactionBodyBuilder = void 0;
const GeneratorUtils_1 = require("./GeneratorUtils");
const UnresolvedAddressDto_1 = require("./UnresolvedAddressDto");
const UnresolvedMosaicIdDto_1 = require("./UnresolvedMosaicIdDto");
class MosaicMetadataTransactionBodyBuilder {
    constructor(targetAddress, scopedMetadataKey, targetMosaicId, valueSizeDelta, value) {
        GeneratorUtils_1.GeneratorUtils.notNull(targetAddress, 'targetAddress is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(scopedMetadataKey, 'scopedMetadataKey is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(targetMosaicId, 'targetMosaicId is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(valueSizeDelta, 'valueSizeDelta is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(value, 'value is null or undefined');
        this.targetAddress = targetAddress;
        this.scopedMetadataKey = scopedMetadataKey;
        this.targetMosaicId = targetMosaicId;
        this.valueSizeDelta = valueSizeDelta;
        this.value = value;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const targetAddress = UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetAddress.getSize());
        const scopedMetadataKey = GeneratorUtils_1.GeneratorUtils.bufferToUint64(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const targetMosaicId = UnresolvedMosaicIdDto_1.UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetMosaicId.getSize());
        const valueSizeDelta = GeneratorUtils_1.GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const valueSize = GeneratorUtils_1.GeneratorUtils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const value = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), valueSize);
        byteArray.splice(0, valueSize);
        return new MosaicMetadataTransactionBodyBuilder(targetAddress, scopedMetadataKey, targetMosaicId, valueSizeDelta, value);
    }
    static createMosaicMetadataTransactionBodyBuilder(targetAddress, scopedMetadataKey, targetMosaicId, valueSizeDelta, value) {
        return new MosaicMetadataTransactionBodyBuilder(targetAddress, scopedMetadataKey, targetMosaicId, valueSizeDelta, value);
    }
    getTargetAddress() {
        return this.targetAddress;
    }
    getScopedMetadataKey() {
        return this.scopedMetadataKey;
    }
    getTargetMosaicId() {
        return this.targetMosaicId;
    }
    getValueSizeDelta() {
        return this.valueSizeDelta;
    }
    getValue() {
        return this.value;
    }
    getSize() {
        let size = 0;
        size += this.targetAddress.getSize();
        size += 8;
        size += this.targetMosaicId.getSize();
        size += 2;
        size += 2;
        size += this.value.length;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const targetAddressBytes = this.targetAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetAddressBytes);
        const scopedMetadataKeyBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getScopedMetadataKey());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, scopedMetadataKeyBytes);
        const targetMosaicIdBytes = this.targetMosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetMosaicIdBytes);
        const valueSizeDeltaBytes = GeneratorUtils_1.GeneratorUtils.uint16ToBuffer(this.getValueSizeDelta());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueSizeDeltaBytes);
        const valueSizeBytes = GeneratorUtils_1.GeneratorUtils.uint16ToBuffer(this.value.length);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueSizeBytes);
        const valueBytes = this.value;
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueBytes);
        return newArray;
    }
}
exports.MosaicMetadataTransactionBodyBuilder = MosaicMetadataTransactionBodyBuilder;
//# sourceMappingURL=MosaicMetadataTransactionBodyBuilder.js.map