"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedMosaicDefinitionTransactionV1 = void 0;
const BlockDuration_1 = require("./BlockDuration");
const MosaicFlags_1 = require("./MosaicFlags");
const MosaicId_1 = require("./MosaicId");
const MosaicNonce_1 = require("./MosaicNonce");
const PublicKey_1 = require("./PublicKey");
const Utils_1 = require("./Utils");
class EmbeddedMosaicDefinitionTransactionV1 {
    constructor({ signerPublicKey, version, network, type, id, duration, nonce, flags, divisibility, }) {
        this.TRANSACTION_VERSION = 1;
        this.TRANSACTION_TYPE = 16717;
        this.signerPublicKey = signerPublicKey;
        this.version = version;
        this.network = network;
        this.type = type;
        this.id = id;
        this.duration = duration;
        this.nonce = nonce;
        this.flags = flags;
        this.divisibility = divisibility;
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
        const id = MosaicId_1.MosaicId.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, id.size);
        const duration = BlockDuration_1.BlockDuration.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, duration.size);
        const nonce = MosaicNonce_1.MosaicNonce.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, nonce.size);
        const flags = Utils_1.Utils.toFlags(MosaicFlags_1.MosaicFlags, Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray)));
        byteArray.splice(0, 1);
        const divisibility = Utils_1.Utils.bufferToUint8(Uint8Array.from(byteArray));
        byteArray.splice(0, 1);
        return new EmbeddedMosaicDefinitionTransactionV1({
            signerPublicKey: signerPublicKey,
            version: version,
            network: network,
            type: type,
            id: id,
            duration: duration,
            nonce: nonce,
            flags: flags,
            divisibility: divisibility,
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
        size += this.id.size;
        size += this.duration.size;
        size += this.nonce.size;
        size += 1;
        size += 1;
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
        const idBytes = this.id.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, idBytes);
        const durationBytes = this.duration.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, durationBytes);
        const nonceBytes = this.nonce.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, nonceBytes);
        const flagsBytes = Utils_1.Utils.uint8ToBuffer(Utils_1.Utils.fromFlags(MosaicFlags_1.MosaicFlags, this.flags));
        newArray = Utils_1.Utils.concatTypedArrays(newArray, flagsBytes);
        const divisibilityBytes = Utils_1.Utils.uint8ToBuffer(this.divisibility);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, divisibilityBytes);
        return newArray;
    }
}
exports.EmbeddedMosaicDefinitionTransactionV1 = EmbeddedMosaicDefinitionTransactionV1;
//# sourceMappingURL=EmbeddedMosaicDefinitionTransactionV1.js.map