"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecretLockInfo = void 0;
const Address_1 = require("./Address");
const Hash256_1 = require("./Hash256");
const Height_1 = require("./Height");
const Mosaic_1 = require("./Mosaic");
const Utils_1 = require("./Utils");
class SecretLockInfo {
    constructor({ version, ownerAddress, mosaic, endHeight, status, hashAlgorithm, secret, recipient }) {
        this.version = version;
        this.ownerAddress = ownerAddress;
        this.mosaic = mosaic;
        this.endHeight = endHeight;
        this.status = status;
        this.hashAlgorithm = hashAlgorithm;
        this.secret = secret;
        this.recipient = recipient;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const version = Utils_1.Utils.bufferToUint16(Uint8Array.from(byteArray));
        byteArray.splice(0, 2);
        const ownerAddress = Address_1.Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, ownerAddress.size);
        const mosaic = Mosaic_1.Mosaic.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.size);
        const endHeight = Height_1.Height.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, endHeight.size);
        const status = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const hashAlgorithm = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        const secret = Hash256_1.Hash256.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, secret.size);
        const recipient = Address_1.Address.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, recipient.size);
        return new SecretLockInfo({
            version: version,
            ownerAddress: ownerAddress,
            mosaic: mosaic,
            endHeight: endHeight,
            status: status,
            hashAlgorithm: hashAlgorithm,
            secret: secret,
            recipient: recipient,
        });
    }
    get size() {
        let size = 0;
        size += 2;
        size += this.ownerAddress.size;
        size += this.mosaic.size;
        size += this.endHeight.size;
        size += 1;
        size += 1;
        size += this.secret.size;
        size += this.recipient.size;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const versionBytes = Utils_1.Utils.uint16ToBuffer(this.version);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, versionBytes);
        const ownerAddressBytes = this.ownerAddress.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, ownerAddressBytes);
        const mosaicBytes = this.mosaic.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, mosaicBytes);
        const endHeightBytes = this.endHeight.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, endHeightBytes);
        const statusBytes = Utils_1.Utils.uint8ToBuffer(this.status);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, statusBytes);
        const hashAlgorithmBytes = Utils_1.Utils.uint8ToBuffer(this.hashAlgorithm);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, hashAlgorithmBytes);
        const secretBytes = this.secret.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, secretBytes);
        const recipientBytes = this.recipient.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, recipientBytes);
        return newArray;
    }
}
exports.SecretLockInfo = SecretLockInfo;
//# sourceMappingURL=SecretLockInfo.js.map