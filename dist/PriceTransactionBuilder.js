"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceTransactionBuilder = void 0;
const PriceTransactionBodyBuilder_1 = require("./PriceTransactionBodyBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
class PriceTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, blockHeight, highPrice, lowPrice) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.priceTransactionBody = new PriceTransactionBodyBuilder_1.PriceTransactionBodyBuilder(blockHeight, highPrice, lowPrice);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const priceTransactionBody = PriceTransactionBodyBuilder_1.PriceTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, priceTransactionBody.getSize());
        return new PriceTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, priceTransactionBody.blockHeight, priceTransactionBody.highPrice, priceTransactionBody.lowPrice);
    }
    static createPriceTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, blockHeight, highPrice, lowPrice) {
        return new PriceTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, blockHeight, highPrice, lowPrice);
    }
    getblockHeight() {
        return this.priceTransactionBody.getblockHeight();
    }
    gethighPrice() {
        return this.priceTransactionBody.gethighPrice();
    }
    getlowPrice() {
        return this.priceTransactionBody.getlowPrice();
    }
    getSize() {
        let size = super.getSize();
        size += this.priceTransactionBody.getSize();
        return size;
    }
    getBody() {
        return this.priceTransactionBody;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const priceTransactionBodyBytes = this.priceTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, priceTransactionBodyBytes);
        return newArray;
    }
}
exports.PriceTransactionBuilder = PriceTransactionBuilder;
//# sourceMappingURL=PriceTransactionBuilder.js.map