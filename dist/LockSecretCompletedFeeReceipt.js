"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockSecretCompletedFeeReceipt = void 0;
const Address_1 = require("./Address");
const Mosaic_1 = require("./Mosaic");
const Utils_1 = require("./Utils");
class LockSecretCompletedFeeReceipt {
    constructor({ version, type, mosaic, targetAddress }) {
        this.RECEIPT_TYPE = 8786;
        this.version = version;
        this.type = type;
        this.mosaic = mosaic;
        this.targetAddress = targetAddress;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const size = Utils_1.Utils.bufferToUint32(Uint8Array.from(byteArray));
        byteArray.splice(0, 4);
        const version = Utils_1.Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const type = Utils_1.Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const mosaic = Mosaic_1.Mosaic.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.size);
        const targetAddress = Address_1.Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, targetAddress.size);
        return new LockSecretCompletedFeeReceipt({ version: version, type: type, mosaic: mosaic, targetAddress: targetAddress });
    }
    get size() {
        let size = 0;
        size += 4;
        size += 2;
        size += 2;
        size += this.mosaic.size;
        size += this.targetAddress.size;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const sizeBytes = Utils_1.Utils.uint32ToBuffer(this.size);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, sizeBytes);
        const versionBytes = Utils_1.Utils.uint16ToBuffer(this.version);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, versionBytes);
        const typeBytes = Utils_1.Utils.uint16ToBuffer(this.type);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, typeBytes);
        const mosaicBytes = this.mosaic.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, mosaicBytes);
        const targetAddressBytes = this.targetAddress.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, targetAddressBytes);
        return newArray;
    }
}
exports.LockSecretCompletedFeeReceipt = LockSecretCompletedFeeReceipt;
//# sourceMappingURL=LockSecretCompletedFeeReceipt.js.map