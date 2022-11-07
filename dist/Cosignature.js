"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cosignature = void 0;
const PublicKey_1 = require("./PublicKey");
const Signature_1 = require("./Signature");
const Utils_1 = require("./Utils");
class Cosignature {
    constructor({ version, signerPublicKey, signature }) {
        this.version = version;
        this.signerPublicKey = signerPublicKey;
        this.signature = signature;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const version = Utils_1.Utils.bufferToBigInt(Uint8Array.from(byteArray));
        byteArray.splice(0, 8);
        const signerPublicKey = PublicKey_1.PublicKey.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, signerPublicKey.size);
        const signature = Signature_1.Signature.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, signature.size);
        return new Cosignature({ version: version, signerPublicKey: signerPublicKey, signature: signature });
    }
    get size() {
        let size = 0;
        size += 8;
        size += this.signerPublicKey.size;
        size += this.signature.size;
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
        return newArray;
    }
}
exports.Cosignature = Cosignature;
//# sourceMappingURL=Cosignature.js.map