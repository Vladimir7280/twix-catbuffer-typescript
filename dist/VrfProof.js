"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VrfProof = void 0;
const ProofGamma_1 = require("./ProofGamma");
const ProofScalar_1 = require("./ProofScalar");
const ProofVerificationHash_1 = require("./ProofVerificationHash");
const Utils_1 = require("./Utils");
class VrfProof {
    constructor({ gamma, verificationHash, scalar }) {
        this.gamma = gamma;
        this.verificationHash = verificationHash;
        this.scalar = scalar;
    }
    static deserialize(payload) {
        const byteArray = Array.from(payload);
        const gamma = ProofGamma_1.ProofGamma.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, gamma.size);
        const verificationHash = ProofVerificationHash_1.ProofVerificationHash.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, verificationHash.size);
        const scalar = ProofScalar_1.ProofScalar.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, scalar.size);
        return new VrfProof({ gamma: gamma, verificationHash: verificationHash, scalar: scalar });
    }
    get size() {
        let size = 0;
        size += this.gamma.size;
        size += this.verificationHash.size;
        size += this.scalar.size;
        return size;
    }
    serialize() {
        let newArray = new Uint8Array();
        const gammaBytes = this.gamma.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, gammaBytes);
        const verificationHashBytes = this.verificationHash.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, verificationHashBytes);
        const scalarBytes = this.scalar.serialize();
        newArray = Utils_1.Utils.concatTypedArrays(newArray, scalarBytes);
        return newArray;
    }
}
exports.VrfProof = VrfProof;
//# sourceMappingURL=VrfProof.js.map