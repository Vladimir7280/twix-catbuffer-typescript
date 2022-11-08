"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceTransactionBodyBuilder = void 0;
const AmountDto_1 = require("./AmountDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
class PriceTransactionBodyBuilder {
    constructor(blockHeight, highPrice, lowPrice) {
        GeneratorUtils_1.GeneratorUtils.notNull(blockHeight, 'blockHeight is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(highPrice, 'highPrice is null or undefined');
        GeneratorUtils_1.GeneratorUtils.notNull(lowPrice, 'lowPrice is null or undefined');
        this.blockHeight = blockHeight;
        this.highPrice = highPrice;
        this.lowPrice = lowPrice;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const blockHeight = AmountDto_1.AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, blockHeight.getSize());
        const highPrice = AmountDto_1.AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, highPrice.getSize());
        const lowPrice = AmountDto_1.AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, lowPrice.getSize());
        return new PriceTransactionBodyBuilder(blockHeight, highPrice, lowPrice);
    }
    static createAddressAliasTransactionBodyBuilder(blockHeight, highPrice, lowPrice) {
        return new PriceTransactionBodyBuilder(blockHeight, highPrice, lowPrice);
    }
    getblockHeight() {
        return this.blockHeight;
    }
    gethighPrice() {
        return this.highPrice;
    }
    getlowPrice() {
        return this.lowPrice;
    }
    getSize() {
        let size = 0;
        size += this.blockHeight.getSize();
        size += this.highPrice.getSize();
        size += this.lowPrice.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const blockHeightBytes = this.blockHeight.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, blockHeightBytes);
        const highPriceBytes = this.highPrice.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, highPriceBytes);
        const lowPriceBytes = this.lowPrice.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, lowPriceBytes);
        return newArray;
    }
}
exports.PriceTransactionBodyBuilder = PriceTransactionBodyBuilder;
//# sourceMappingURL=PriceTransactionBodyBuilder.js.map