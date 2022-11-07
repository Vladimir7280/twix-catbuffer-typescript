"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedPriceTransactionV1 = void 0;
const Amount_1 = require("./Amount");
const PublicKey_1 = require("./PublicKey");
const Utils_1 = require("./Utils");
class EmbeddedPriceTransactionV1 {
    constructor({ signerPublicKey, version, network, type, blockheight, highprice, lowprice }) {
        this.TRANSACTION_VERSION = 1;
        this.TRANSACTION_TYPE = 16726;
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.blockheight = blockheight;
        this.highprice = highprice;
        this.lowprice = lowprice;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const size = Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const signerPublicKey = PublicKey_1.PublicKey.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, signerPublicKey.size);
        Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const version = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const network = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const type = Utils_1.Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const blockheight = Amount_1.Amount.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, blockheight.size);
        const highprice = Amount_1.Amount.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, highprice.size);
        const lowprice = Amount_1.Amount.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, lowprice.size);
        return new EmbeddedPriceTransactionV1({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            blockheight: blockheight,
            highprice: highprice,
            lowprice: lowprice,
        });
    }
    get size() {
        let size = 0;
        size += 4;
        size += 4;
        size += this.signerPublicKey.size;
        size += 4;
        size += 1;
        size += 1;
        size += 2;
        size += this.blockheight.size;
        size += this.highprice.size;
        size += this.lowprice.size;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const sizeBytes = Utils_1.Utils.uint32ToBuffer(this.size);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, sizeBytes);
        const embeddedTransactionHeaderReserved_1Bytes = Utils_1.Utils.uint32ToBuffer(0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, embeddedTransactionHeaderReserved_1Bytes);
        const signerPublicKeyBytes = this.signerPublicKey.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, signerPublicKeyBytes);
        const entityBodyReserved_1Bytes = Utils_1.Utils.uint32ToBuffer(0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, entityBodyReserved_1Bytes);
        const versionBytes = Utils_1.Utils.uint8ToBuffer(this.version);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, versionBytes);
        const networkBytes = Utils_1.Utils.uint8ToBuffer(this.network);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, networkBytes);
        const typeBytes = Utils_1.Utils.uint16ToBuffer(this.type);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, typeBytes);
        const blockheightBytes = this.blockheight.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, blockheightBytes);
        const highpriceBytes = this.highprice.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, highpriceBytes);
        const lowpriceBytes = this.lowprice.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, lowpriceBytes);
        return newArray;
    }
}
exports.EmbeddedPriceTransactionV1 = EmbeddedPriceTransactionV1;
//# sourceMappingURL=EmbeddedPriceTransactionV1.js.map