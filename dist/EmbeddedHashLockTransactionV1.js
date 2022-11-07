"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedHashLockTransactionV1 = void 0;
const BlockDuration_1 = require("./BlockDuration");
const Hash256_1 = require("./Hash256");
const PublicKey_1 = require("./PublicKey");
const UnresolvedMosaic_1 = require("./UnresolvedMosaic");
const Utils_1 = require("./Utils");
class EmbeddedHashLockTransactionV1 {
    constructor({ signerPublicKey, version, network, type, mosaic, duration, hash }) {
        this.TRANSACTION_VERSION = 1;
        this.TRANSACTION_TYPE = 16712;
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.mosaic = mosaic;
        this.duration = duration;
        this.hash = hash;
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
        const mosaic = UnresolvedMosaic_1.UnresolvedMosaic.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.size);
        const duration = BlockDuration_1.BlockDuration.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, duration.size);
        const hash = Hash256_1.Hash256.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, hash.size);
        return new EmbeddedHashLockTransactionV1({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            mosaic: mosaic,
            duration: duration,
            hash: hash,
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
        size += this.mosaic.size;
        size += this.duration.size;
        size += this.hash.size;
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
        const mosaicBytes = this.mosaic.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, mosaicBytes);
        const durationBytes = this.duration.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, durationBytes);
        const hashBytes = this.hash.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, hashBytes);
        return newArray;
    }
}
exports.EmbeddedHashLockTransactionV1 = EmbeddedHashLockTransactionV1;
//# sourceMappingURL=EmbeddedHashLockTransactionV1.js.map