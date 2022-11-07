"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedTransferTransactionV1 = void 0;
const PublicKey_1 = require("./PublicKey");
const UnresolvedAddress_1 = require("./UnresolvedAddress");
const UnresolvedMosaic_1 = require("./UnresolvedMosaic");
const Utils_1 = require("./Utils");
class EmbeddedTransferTransactionV1 {
    constructor({ signerPublicKey, version, network, type, recipientAddress, mosaics, message }) {
        this.TRANSACTION_VERSION = 1;
        this.TRANSACTION_TYPE = 16724;
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.recipientAddress = recipientAddress;
        this.mosaics = mosaics;
        this.message = message;
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
        const recipientAddress = UnresolvedAddress_1.UnresolvedAddress.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, recipientAddress.size);
        const messageSize = Utils_1.Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const mosaicsCount = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const mosaics = Utils_1.Utils.deserialize(UnresolvedMosaic_1.UnresolvedMosaic.deserialize, Uint8Array.from(byteArray), mosaicsCount);
        byteArray.splice(0, mosaics.reduce((sum, c) => sum + c.size, 0));
        const message = Utils_1.Utils.getBytes(Uint8Array.from(byteArray), messageSize);
        byteArray.splice(0, messageSize);
        return new EmbeddedTransferTransactionV1({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            recipientAddress: recipientAddress,
            mosaics: mosaics,
            message: message,
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
        size += this.recipientAddress.size;
        size += 2;
        size += 1;
        size += 1;
        size += 4;
        size += this.mosaics.reduce((sum, c) => sum + Utils_1.Utils.getSizeWithPadding(c.size, 0), 0);
        size += this.message.length;
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
        const recipientAddressBytes = this.recipientAddress.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, recipientAddressBytes);
        const messageSizeBytes = Utils_1.Utils.uint16ToBuffer(this.message.length);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, messageSizeBytes);
        const mosaicsCountBytes = Utils_1.Utils.uint8ToBuffer(this.mosaics.length);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, mosaicsCountBytes);
        const transferTransactionBodyReserved_1Bytes = Utils_1.Utils.uint8ToBuffer(0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, transferTransactionBodyReserved_1Bytes);
        const transferTransactionBodyReserved_2Bytes = Utils_1.Utils.uint32ToBuffer(0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, transferTransactionBodyReserved_2Bytes);
        const mosaicsBytes = Utils_1.Utils.writeList(this.mosaics, 0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, mosaicsBytes);
        const messageBytes = this.message;
        newArray = Utils_1.Utils.concatTypedArrays(newArray, messageBytes);
        return newArray;
    }
}
exports.EmbeddedTransferTransactionV1 = EmbeddedTransferTransactionV1;
//# sourceMappingURL=EmbeddedTransferTransactionV1.js.map