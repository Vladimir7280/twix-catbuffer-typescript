"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedAccountMetadataTransactionV1 = void 0;
const PublicKey_1 = require("./PublicKey");
const UnresolvedAddress_1 = require("./UnresolvedAddress");
const Utils_1 = require("./Utils");
class EmbeddedAccountMetadataTransactionV1 {
    constructor({ signerPublicKey, version, network, type, targetAddress, scopedMetadataKey, valueSizeDelta, value, }) {
        this.TRANSACTION_VERSION = 1;
        this.TRANSACTION_TYPE = 16708;
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.targetAddress = targetAddress;
        this.scopedMetadataKey = scopedMetadataKey;
        this.valueSizeDelta = valueSizeDelta;
        this.value = value;
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
        const targetAddress = UnresolvedAddress_1.UnresolvedAddress.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, targetAddress.size);
        const scopedMetadataKey = Utils_1.Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const valueSizeDelta = Utils_1.Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const valueSize = Utils_1.Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const value = Utils_1.Utils.getBytes(Uint8Array.from(byteArray), valueSize);
        byteArray.splice(0, valueSize);
        return new EmbeddedAccountMetadataTransactionV1({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            targetAddress: targetAddress,
            scopedMetadataKey: scopedMetadataKey,
            valueSizeDelta: valueSizeDelta,
            value: value,
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
        size += this.targetAddress.size;
        size += 8;
        size += 2;
        size += 2;
        size += this.value.length;
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
        const targetAddressBytes = this.targetAddress.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, targetAddressBytes);
        const scopedMetadataKeyBytes = Utils_1.Utils.bigIntToBuffer(this.scopedMetadataKey);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, scopedMetadataKeyBytes);
        const valueSizeDeltaBytes = Utils_1.Utils.uint16ToBuffer(this.valueSizeDelta);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, valueSizeDeltaBytes);
        const valueSizeBytes = Utils_1.Utils.uint16ToBuffer(this.value.length);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, valueSizeBytes);
        const valueBytes = this.value;
        newArray = Utils_1.Utils.concatTypedArrays(newArray, valueBytes);
        return newArray;
    }
}
exports.EmbeddedAccountMetadataTransactionV1 = EmbeddedAccountMetadataTransactionV1;
//# sourceMappingURL=EmbeddedAccountMetadataTransactionV1.js.map