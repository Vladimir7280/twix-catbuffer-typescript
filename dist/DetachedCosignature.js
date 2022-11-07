"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetachedCosignature = void 0;
const Hash256_1 = require("./Hash256");
const PublicKey_1 = require("./PublicKey");
const Signature_1 = require("./Signature");
const Utils_1 = require("./Utils");
class DetachedCosignature {
    constructor({ version, signerPublicKey, signature, parentHash }) {
        this.version = version;
        this.signerPublicKey = signerPublicKey;
        this.signature = signature;
        this.parentHash = parentHash;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const version = Utils_1.Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const signerPublicKey = PublicKey_1.PublicKey.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, signerPublicKey.size);
        const signature = Signature_1.Signature.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, signature.size);
        const parentHash = Hash256_1.Hash256.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, parentHash.size);
        return new DetachedCosignature({
            version: version,
            signerPublicKey: signerPublicKey,
            signature: signature,
            parentHash: parentHash,
        });
    }
    get size() {
        let size = 0;
        size += 8;
        size += this.signerPublicKey.size;
        size += this.signature.size;
        size += this.parentHash.size;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const versionBytes = Utils_1.Utils.bigIntToBuffer(this.version);
        newArray = Utils_1.Utils.concatTypedArrays(newArray, versionBytes);
        const signerPublicKeyBytes = this.signerPublicKey.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, signerPublicKeyBytes);
        const signatureBytes = this.signature.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, signatureBytes);
        const parentHashBytes = this.parentHash.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, parentHashBytes);
        return newArray;
    }
}
exports.DetachedCosignature = DetachedCosignature;
//# sourceMappingURL=DetachedCosignature.js.map