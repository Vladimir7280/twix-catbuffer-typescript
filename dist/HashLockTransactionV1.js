"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashLockTransactionV1 = void 0;
const Amount_1 = require("./Amount");
const BlockDuration_1 = require("./BlockDuration");
const Hash256_1 = require("./Hash256");
const PublicKey_1 = require("./PublicKey");
const Signature_1 = require("./Signature");
const Timestamp_1 = require("./Timestamp");
const UnresolvedMosaic_1 = require("./UnresolvedMosaic");
const Utils_1 = require("./Utils");
class HashLockTransactionV1 {
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, mosaic, duration, hash, }) {
        this.TRANSACTION_VERSION = 1;
        this.TRANSACTION_TYPE = 16712;
        this.signature = signature;
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.fee = fee;
        this.deadline = deadline;
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
        const signature = Signature_1.Signature.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, signature.size);
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
        const fee = Amount_1.Amount.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, fee.size);
        const deadline = Timestamp_1.Timestamp.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, deadline.size);
        const mosaic = UnresolvedMosaic_1.UnresolvedMosaic.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.size);
        const duration = BlockDuration_1.BlockDuration.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, duration.size);
        const hash = Hash256_1.Hash256.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, hash.size);
        return new HashLockTransactionV1({
            signature: signature,
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            fee: fee,
            deadline: deadline,
            mosaic: mosaic,
            duration: duration,
            hash: hash,
        });
    }
    get size() {
        let size = 0;
        size += 4;
        size += 4;
        size += this.signature.size;
        size += this.signerPublicKey.size;
        size += 4;
        size += 1;
        size += 1;
        size += 2;
        size += this.fee.size;
        size += this.deadline.size;
        size += this.mosaic.size;
        size += this.duration.size;
        size += this.hash.size;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const sizeBytes = Utils_1.Utils.uint32ToBuffer(this.size);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, sizeBytes);
        const verifiableEntityHeaderReserved_1Bytes = Utils_1.Utils.uint32ToBuffer(0);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, verifiableEntityHeaderReserved_1Bytes);
        const signatureBytes = this.signature.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, signatureBytes);
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
        const feeBytes = this.fee.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, feeBytes);
        const deadlineBytes = this.deadline.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, deadlineBytes);
        const mosaicBytes = this.mosaic.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, mosaicBytes);
        const durationBytes = this.duration.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, durationBytes);
        const hashBytes = this.hash.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, hashBytes);
        return newArray;
    }
}
exports.HashLockTransactionV1 = HashLockTransactionV1;
//# sourceMappingURL=HashLockTransactionV1.js.map