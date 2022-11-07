"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedMosaicAddressRestrictionTransactionV1 = void 0;
const PublicKey_1 = require("./PublicKey");
const UnresolvedAddress_1 = require("./UnresolvedAddress");
const UnresolvedMosaicId_1 = require("./UnresolvedMosaicId");
const Utils_1 = require("./Utils");
class EmbeddedMosaicAddressRestrictionTransactionV1 {
    constructor({ signerPublicKey, version, network, type, mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress, }) {
        this.TRANSACTION_VERSION = 1;
        this.TRANSACTION_TYPE = 16977;
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.mosaicId = mosaicId;
        this.restrictionKey = restrictionKey;
        this.previousRestrictionValue = previousRestrictionValue;
        this.newRestrictionValue = newRestrictionValue;
        this.targetAddress = targetAddress;
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
        const mosaicId = UnresolvedMosaicId_1.UnresolvedMosaicId.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.size);
        const restrictionKey = Utils_1.Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const previousRestrictionValue = Utils_1.Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const newRestrictionValue = Utils_1.Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const targetAddress = UnresolvedAddress_1.UnresolvedAddress.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, targetAddress.size);
        return new EmbeddedMosaicAddressRestrictionTransactionV1({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            mosaicId: mosaicId,
            restrictionKey: restrictionKey,
            previousRestrictionValue: previousRestrictionValue,
            newRestrictionValue: newRestrictionValue,
            targetAddress: targetAddress,
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
        size += this.mosaicId.size;
        size += 8;
        size += 8;
        size += 8;
        size += this.targetAddress.size;
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
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, mosaicIdBytes);
        const restrictionKeyBytes = Utils_1.Utils.bigIntToBuffer(this.restrictionKey);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, restrictionKeyBytes);
        const previousRestrictionValueBytes = Utils_1.Utils.bigIntToBuffer(this.previousRestrictionValue);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, previousRestrictionValueBytes);
        const newRestrictionValueBytes = Utils_1.Utils.bigIntToBuffer(this.newRestrictionValue);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, newRestrictionValueBytes);
        const targetAddressBytes = this.targetAddress.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, targetAddressBytes);
        return newArray;
    }
}
exports.EmbeddedMosaicAddressRestrictionTransactionV1 = EmbeddedMosaicAddressRestrictionTransactionV1;
//# sourceMappingURL=EmbeddedMosaicAddressRestrictionTransactionV1.js.map