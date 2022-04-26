"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedPriceTransactionBuilder = void 0;
const PriceTransactionBodyBuilder_1 = require("./PriceTransactionBodyBuilder");
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
class EmbeddedPriceTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, blockHeight, highPrice, lowPrice) {
        super(signerPublicKey, version, network, type);
        this.priceTransactionBody = new PriceTransactionBodyBuilder_1.PriceTransactionBodyBuilder(blockHeight, highPrice, lowPrice);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(payload);
        byteArray.splice(0, superObject.getSize());
        const addressAliasTransactionBody = PriceTransactionBodyBuilder_1.PriceTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, addressAliasTransactionBody.getSize());
        return new EmbeddedPriceTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, addressAliasTransactionBody.blockHeight, addressAliasTransactionBody.highPrice, addressAliasTransactionBody.lowPrice);
    }
    static createEmbeddedPriceTransactionBuilder(signerPublicKey, version, network, type, blockHeight, highPrice, lowPrice) {
        return new EmbeddedPriceTransactionBuilder(signerPublicKey, version, network, type, blockHeight, highPrice, lowPrice);
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
exports.EmbeddedPriceTransactionBuilder = EmbeddedPriceTransactionBuilder;
//# sourceMappingURL=EmbeddedPriceTransactionBuilder.js.map